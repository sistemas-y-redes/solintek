<template>
    <div>
        <div class="boton-retorno mb-4">
            <NuxtLink to="/">&lt; <span>VOLVER</span></NuxtLink>
        </div>
        <div class="vacationForm vacation-section">
            <label>Seleccionar período de vacaciones:</label>
            <div>
                <label for="startDate">Fecha de inicio:</label>
                <datepicker id="startDate" v-model="startDate" :format="customFormatter" :disabled-dates="disabledDates"
                    input-class="form-input " :calendar-class="calendarCentered">
                </datepicker>
            </div>
            <div>
                <label for="endDate">Fecha de fin:</label>
                <datepicker id="endDate" v-model="endDate" :format="customFormatter" :disabled-dates="disabledEndDates"
                    :disabled="!startDate" input-class="form-input" :calendar-class="calendarCentered"></datepicker>
            </div>
            <div class="form-group">
                <label for="notas">Seleccionar motivo de vacaciones</label>
                <select class="form-select" v-model="vacationReason">
                    <option disabled value="">Por favor seleccione uno</option>
                    <option>Vacaciones</option>
                    <option>Baja</option>
                    <option>Día libre</option>
                    <option>Ausencia injustificada</option>
                    <option>Formación</option>
                    <option>No trabajado</option>
                    <!-- Agrega más motivos aquí -->
                </select>
            </div>

            <div class="form-group">
                <label for="notas">Notas:</label>
                <textarea class="textarea form-control" type="text" id="notas" v-model="notas"
                    placeholder="Escribe tus notas aquí"></textarea>
            </div>
            <b-button variant="primary" class="text-center" :disabled="!startDate || !endDate || !vacationReason"
                @click="setVacaciones">
                Solicitar
            </b-button>
        </div>
        <!-- El resto de tu contenido existente -->
        <div v-if="vacations && vacations.length > 0" class="vacation-section">
            <h2>Vacaciones Solicitadas</h2>
            <ul class="vacation-list">
                <li v-for="(vacation, index) in vacations" :key="index" class="vacation-item">

                    <div v-if="!vacation.editing" class="vacation-detail"><strong>Desde:</strong> {{
                        formatearFecha(vacation.fieldData.FechaDesde) }}
                    </div>
                    <div v-if="!vacation.editing" class="vacation-detail"><strong>Hasta:</strong> {{
                        formatearFecha(vacation.fieldData.FechaHasta) }}
                    </div>
                    <div v-if="!vacation.editing" class="vacation-detail"><strong>Motivo:</strong> {{
                        vacation.fieldData.Motivo }}</div>
                    <div v-if="!vacation.editing" class="vacation-detail">
                        <span class="estado-container">
                            <strong>Estado:</strong> {{
                                vacation.fieldData.Estado }} <span v-if="vacation.fieldData.Estado === 'SOLICITADAS'"
                                class="status-icon purple"></span>
                            <span v-else-if="vacation.fieldData.Estado === 'EN PROCESO'" class="status-icon blue"></span>
                            <span v-else-if="vacation.fieldData.Estado === 'RECHAZADAS'" class="status-icon red"></span>
                            <span v-else-if="vacation.fieldData.Estado === 'PENDIENTES'" class="status-icon pink"></span>
                            <span v-else-if="vacation.fieldData.Estado === 'FIRMADAS'" class="status-icon green"></span>
                        </span>
                    </div>
                    <div v-if="!vacation.editing" class="vacation-detail"><strong>Notas:</strong> {{
                        vacation.fieldData.Notas }}
                    </div>
                    <b-button variant="outline-primary"
                        v-if="!vacation.editing && vacation.fieldData.Estado === 'SOLICITADAS'"
                        @click="editarVacacion(vacation)">
                        Editar
                    </b-button>

                    <b-modal id="modal-editar-historico" title="Editar vacaciones" @hide="cancelarEdicion">
                        <b-row class="form-option my-3">
                            <label for="editStartDate">Fecha de inicio:</label>
                            <datepicker id="editStartDate" v-model="vacacionActual.FechaDesde" :format="customFormatter"
                                :disabled-dates="disabledDates" input-class="form-input form-control" :calendar-class="calendarCentered">
                            </datepicker>
                        </b-row>
                        <b-row class="form-option my-3">
                            <label for="editEndDate">Fecha de fin:</label>
                            <datepicker id="editEndDate" v-model="vacacionActual.FechaHasta" :format="customFormatter"
                                :disabled-dates="calculateDisabledEndDates(vacacionActual.FechaDesde)"
                                :disabled="!vacacionActual.FechaDesde" input-class="form-input form-control" :calendar-class="calendarCentered">
                            </datepicker>
                        </b-row>
                        <b-row class="form-option my-3">
                            <p>Seleccionar motivo de vacaciones</p>
                            <select class="form-select" v-model="vacacionActual.Motivo">
                                <option disabled value="">Por favor seleccione uno</option>
                                <option>Vacaciones</option>
                                <option>Baja</option>
                                <option>Día libre</option>
                                <option>Ausencia injustificada</option>
                                <option>Formación</option>
                                <option>No trabajado</option>
                                <!-- Agrega más motivos aquí -->
                            </select>
                        </b-row>
                        <b-row class="form-option my-3">

                            <label for="notas">Notas:</label>
                            <textarea class="textarea form-control " type="text" v-model="vacacionActual.Notas"></textarea>
                        </b-row>
                        <b-button variant="outline-primary" @click="guardarCambios(vacacionActual)">
                            Guardar
                            Cambios
                        </b-button>
                    </b-modal>

                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>
import Swal from "sweetalert2";
import Datepicker from 'vuejs-datepicker';

export default {
    middleware: "authentication",
    components: {
        Datepicker
    },
    data() {
        return {
            startDate: null,
            endDate: null,
            vacationReason: '',
            disabledDates: {
                to: new Date(new Date().setDate(new Date().getDate() - 1)), // Deshabilita fechas pasadas
            },
            vacations: [],
            vacacionActual: {
                FechaDesde: '',
                FechaHasta: '',
                Motivo: '',
                Notas: '',
                recordId: '',

            },
            mostrarModalEdicion: false,
            notas: '',
            calendarCentered: 'datepicker-popup',

        };
    },
    computed: {
        disabledEndDates() {
            const start = this.startDate;
            if (!start) {
                return { from: null, to: null }; // No hay fechas deshabilitadas si no se ha seleccionado la fecha de inicio
            }

            // Establece el límite inferior como el día después de la fecha de inicio
            const dayAfterStart = new Date(start);
            dayAfterStart.setDate(dayAfterStart.getDate() + 1);
            return {
                to: new Date(dayAfterStart) // Deshabilita todas las fechas hasta el día después de la fecha de inicio
            };
        }
    },
    methods: {
        customFormatter(date) {
            if (!date) return ''; // Asegúrate de que la fecha no sea nula o indefinida
            const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
            return new Intl.DateTimeFormat('es-ES', options).format(new Date(date));
        },
        calculateDisabledEndDates(startDate) {
            if (!startDate) {
                return { from: null, to: null };
            }

            const dayAfterStart = new Date(startDate);
            dayAfterStart.setDate(dayAfterStart.getDate() + 1);
            return {
                to: new Date(dayAfterStart)
            };
        },
        formatearFecha(fecha) {
            if (fecha instanceof Date) {
                fecha = this.customFormatter(fecha);
            }
            // Dividir la fecha en un array [MM, DD, YYYY]
            var partes = fecha.split('/');

            // Verificar si la fecha tiene el formato correcto
            if (partes.length !== 3 || partes[0].length !== 2 || partes[1].length !== 2 || partes[2].length !== 4) {
                return 'Fecha no válida';
            }

            // Cambiar el orden de los elementos para obtener el formato DD-MM-YYYY
            var nuevaFecha = partes[1] + '/' + partes[0] + '/' + partes[2];

            return nuevaFecha;
        },
        async setVacaciones() {
            if (!this.startDate || !this.endDate || !this.vacationReason) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    confirmButtonColor: "#000",
                    text: `Por favor, completa todos los campos. `,
                });
                return;
            }
            let tec = this.$store.state.User;
            try {
                let response = await this.$axios.$post(
                    "/api/vacaciones/new",
                    { Tec: tec, motivo: this.vacationReason, FechaIni: this.customFormatter(this.startDate), FechaFin: this.customFormatter(this.endDate), Notas: notas },
                    {
                        headers: {
                            Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
                        },
                    }
                );
                if (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Enviado a Filemaker",
                        confirmButtonColor: "#000",
                        text: `Se ha enviado a Filemaker y será insertado en breves`,
                    });
                    window.location.href = window.location.href
                }
            } catch (e) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    confirmButtonColor: "#000",
                    text: `Las fechas de las vacaciones se solapan con una solicitud existente. `,
                });
                this.error = true;
                console.log(e);
            }
            this.loading = false;
        }, async getVacaciones() {

            let tec = this.$store.state.User;
            try {
                let response = await this.$axios.$post(
                    "/api/vacaciones/find",
                    { Tec: tec },
                    {
                        headers: {
                            Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
                        },
                    }
                );
                if (response instanceof Object) {
                    this.vacations = response;
                }

            } catch (e) {
                this.error = true;
                console.log(e);
            }
            this.loading = false;
        },
        editarVacacion(vacation) {
            console.log(vacation);
            this.$bvModal.show('modal-editar-historico');
            this.vacacionActual = vacation.fieldData;
            this.vacacionActual.recordId = vacation.recordId;
        },
        async guardarCambios(vacation) {
            // Aquí deberías actualizar la lista de vacaciones y posiblemente enviar los cambios al servidor
            if (!vacation) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    confirmButtonColor: "#000",
                    text: `No se a podido actualizar la solicitud. `,
                });
            }

            let tec = this.$store.state.User;
            let data = {
                Tec: tec,
                motivo: vacation.Motivo,
                FechaIni: this.customFormatter(vacation.FechaDesde),
                FechaFin: this.customFormatter(vacation.FechaHasta),
                Notas: vacation.Notas,

            };
            try {
                let response = await this.$axios.$patch(
                    `/api/vacaciones/edit/${vacation.recordId}`, data,
                    {
                        headers: {
                            Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
                        },
                    }
                );
                if (response) {
                    Swal.fire({
                        icon: "success",
                        title: "Enviado a Filemaker",
                        confirmButtonColor: "#000",
                        text: `Se ha enviado a Filemaker y será actualizado en breves`,
                    });
                    window.location.href = window.location.href
                }
            } catch (e) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    confirmButtonColor: "#000",
                    text: `No se ha podido actualizar la solicitud. `,
                });
                this.error = true;
                console.log(e);
            }
            vacation.editing = false;

        },
        cancelarEdicion() {
            this.$bvModal.hide('modal-editar-historico');
            this.vacacionActual = [];
        }
    },
    mounted() {
        this.getVacaciones();
    },
}
</script>
  
<style scoped>

/* Estilos generales para móviles */
div {
    padding: 0 15px;
    /* Añade padding a los lados para evitar que el contenido toque los bordes */
}

h2 {
    font-size: 1.2em;
    /* Aumenta el tamaño para una mejor visibilidad */
    margin-bottom: 0.5em;
    margin-top: 0.5em;
    /* Añade un poco de margen debajo de los títulos */
}

label {
    display: block;
    /* Asegura que la etiqueta esté en su propia línea */
    margin: 10px 0;
    /* Añade margen para separarla de otros elementos */
}

input[type="text"],
select {
    width: 100%;
    /* Usa todo el ancho disponible */
    padding: 10px;
    /* Añade padding para hacerlos más fáciles de tocar */
    margin-bottom: 20px;
    /* Añade espacio debajo de cada campo */
    border: 1px solid #ccc;
    /* Añade o ajusta el borde según sea necesario */
    font-size: 1em;
    /* Ajusta el tamaño de la fuente para mejorar la legibilidad */
}

.datepicker,
select,
button {
    width: 100%;
    /* Aprovecha el ancho completo */
    max-width: 100%;
    /* Asegura que no sobrepase el ancho de la pantalla */
    margin-bottom: 20px;
}

.vacation-list {
    list-style-type: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* Centra los elementos en el eje cruzado */
}

.vacation-item {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    width: 80%;
    /* O el ancho que prefieras */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.vacationForm {
    border: 1px solid #ccc;
    border-radius: 8px;
}

.vacation-detail {
    margin-bottom: 10px;
}

h2 {
    text-align: center;
}

.vacation-section {
    background-color: #f9f9f9;
    /* Color de fondo suave */
    border-top: 2px solid #eee;
    /* Borde superior para separar las secciones */
    padding-top: 20px;
    /* Espacio en la parte superior */
    margin-top: 30px;
    /* Margen superior para más separación */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
    /* Sombra sutil */
}

.edit-button {
    margin-right: 10px;
    /* Otros estilos para el botón */
}

.status-icon {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 5px;
}
.estado-container {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: black;
}


.purple {
    background-color: #A072FD;
}

.pink {
    background-color: #FFA49F;
}

.blue {
    background-color: #97B6FC;
}

.green {
    background-color: green;
}

.red {
    background-color: red;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group textarea[type="text"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.modal-edicion {
    padding: 0 0px;
}

.form-input-datepicker {
    background-color: white !important;
    border: 1px solid #ccc !important;
    height: 50px;
    width: -webkit-fill-available;
}
::v-deep .form-input {
  width: 100%; /* Make the input take the full width of its parent */
  box-sizing: border-box;
  border: 0.5px solid #CCCCCC;
  background-color: white !important; /* Include padding and border in the element's total width and height */
  /* Add any additional styling you need here */

}

::v-deep .datepicker-popup {
    position: fixed; /* or absolute, depending on how your datepicker positions the popup */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

</style>