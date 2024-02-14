<template>
  <div class="new-data-form-parent">
    <form class="new-data-form" @submit.prevent="handleSubmit()">
      <!-- Input de Fecha -->
      <b-row class="form-option my-4">
        <label v-if="!errorFecha">Fecha</label>
        <label v-else>Fecha <span>Debes introducir una fecha válida</span></label>
        <b-form-datepicker v-model="form.linFecha" :value="min" :min="min" class="form-input" type="text" name="fecha"
          :placeholder="form.linFecha" disabled />
      </b-row>
      <b-row class="form-option my-3">
        <label>Técnico</label>
        <b-form-select v-model="tecnicoSeleccionado" :options="tecnicos"></b-form-select>
      </b-row>
      <!-- Input de Hora Inicio -->
      <b-row class="form-option my-3">
        <label v-if="!errorHoraInicio">Hora Inicio</label>
        <label v-else>Hora Inicio <span>Debes introducir una hora válida</span></label>
        <input v-model="form.HoraInicio" class="form-input" type="time" name="hora-inicio" placeholder="" required />
      </b-row>
      <!-- Input de Hora Final -->
      <b-row class="form-option my-3">
        <label v-if="!errorHoraFinal">Hora Fin</label>
        <label v-else>Hora Fin <span>Debes introducir una hora válida</span></label>
        <input v-model="form.HoraFin" class="form-input" type="time" name="hora-fin" placeholder="" />
      </b-row>
      <b-row class="form-option my-3">
        <label>Referencia</label>
        <b-form-select v-model="form.linartcodref" :options="articulos" @change="onArticuloChange"></b-form-select>
      </b-row>

      <!-- Botón de submit -->
      <b-row class="form-option my-4">
        <button v-if="this.loading === false" class="mb-4" type="submit" id="submit">
          <b>Añadir</b>
        </button>
        <div v-if="this.loading === true" class="spin"></div>
      </b-row>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Datepicker from "vuejs-datepicker";

export default {
  props: ["visita", "FormActive"],
  components: {
    Datepicker,
  },
  data() {
    // Calendario
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const minDate = new Date(today);

    return {
      tecnicos: [],
      form: {
        linFecha: new Date().toISOString().slice(0, 10),
        HoraInicio: "",
        HoraFin: "",
        DescripciónArt: "",
        NumeroServicio: this.visita[0].fieldData.NumeroServicio,
        Tec: this.$store.state.User.CódigoFM,
        Tipo: "M.Obra",
        linartcodref: "",
      },
      numeroTecnico: this.$store.state.User.CódigoFM,
      nombreTecnico: this.$store.state.User.EmpleadoNombre,
      errorFecha: false,
      errorHoraInicio: false,
      errorHoraFinal: false,
      errorDescripcion: false,
      min: minDate,
      loading: false,
      tecnicoSeleccionado: "",
      articulos: [],
    };
  },
  methods: {
    async handleSubmit() {
      let errorMostrar = "";

      if (this.form.linFecha.length === 0) {
        errorMostrar = "comprueba la fecha";
        throw errorMostrar;
      }

      if (this.form.HoraInicio.length === 0) {
        errorMostrar = "comprueba la hora de inicio";
        throw errorMostrar;
      }

      // if (this.form.HoraFin.length === 0) {
      //   errorMostrar = "comprueba la hora de fin";
      //   throw errorMostrar;
      // }

      if (this.form.linartcodref.length === 0) {
        errorMostrar = "comprueba la descripción";
        throw errorMostrar;
      }

      const formulario = { ...this.form };
      this.loading = true;
      this.$store.commit("insertHora", formulario);

      this.$axios
        .$post(
          `/api/visitas/${this.visita[0].fieldData["Numero"]}/seguimiento`,
          {
            formulario,
            headers: {
              Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
            },
          }
        )
        .then((response) => {
          this.$store.commit(
            "deleteHora",
            this.$store.state.Horas.indexOf(formulario)
          );
        })
        .catch((e) => {
          console.log("Error", e);
          errorMostrar = "no se ha podido subir el seguimiento";
          Swal.fire({
            icon: "error",
            title: "Oops...",
            confirmButtonColor: "#000",
            text: `¡Algo ha ido mal, ${errorMostrar}! Inténtalo de nuevo.`,
          });
        });

      Swal.fire({
        icon: "success",
        title: "Parte de horas creado",
        confirmButtonColor: "#000",
        text: `Se ha creado el parte de trabajo correctamente`,
      }).then(() => {
        this.$emit('form-success');
        //window.location.href = window.location.href
      });

      this.form.linFecha = "";
      this.form.HoraInicio = "";
      this.form.HoraFin = "";
      this.form.DescripciónArt = "";
      this.loading = false;
    },
    onArticuloChange(newValue) {
      // Encuentra el artículo seleccionado basado en el valor
      const articuloSeleccionado = this.articulos.find(articulo => articulo.value === newValue);
      // Actualiza form.linartcodref con el valor seleccionado
      this.form.linartcodref = articuloSeleccionado.value;
      // Actualiza form.DescripciónArt con el texto del artículo seleccionado
      this.form.DescripciónArt = articuloSeleccionado.text;
    },
    getCurrentTime() {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    async fetchArticulos() {
      try {
        const apiUrl = `/api/visitas/articulos`;
        const response = await this.$axios.post(apiUrl, {
          headers: {
            Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
          },
        });
        // Asumiendo que la respuesta es un array de vehículos
        this.articulos = response.data.map(articulo => ({
          value: articulo.fieldData.artcodant,
          text: articulo.fieldData.artdesc
        }));

      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchArticulos()
    this.tecnicos.push()
    if (this.visita.visitaFieldata["Visitas::Tec2"]) this.tecnicos.push({ value: this.visita.visitaFieldata["Visitas::Tec2"], text: this.visita.visitaFieldata["Visitas::TecNom2"] })
    if (this.visita.visitaFieldata["Visitas::Tec3"]) this.tecnicos.push({ value: this.visita.visitaFieldata["Visitas::Tec3"], text: this.visita.visitaFieldata["Visitas::TecNom3"] })
    if (this.visita.visitaFieldata["Visitas::Tec4"]) this.tecnicos.push({ value: this.visita.visitaFieldata["Visitas::Tec4"], text: this.visita.visitaFieldata["Visitas::TecNom4"] })
    if (this.visita.visitaFieldata["Visitas::Tec5"]) this.tecnicos.push({ value: this.visita.visitaFieldata["Visitas::Tec5"], text: this.visita.visitaFieldata["Visitas::TecNom5"] })
    if (this.visita.visitaFieldata["Visitas::Tec6"]) this.tecnicos.push({ value: this.visita.visitaFieldata["Visitas::Tec6"], text: this.visita.visitaFieldata["Visitas::TecNom6"] })
    if (this.visita.visitaFieldata["Visitas::Tec7"]) this.tecnicos.push({ value: this.visita.visitaFieldata["Visitas::Tec7"], text: this.visita.visitaFieldata["Visitas::TecNom7"] })
    if (this.visita.visitaFieldata["Visitas::Tec8"]) this.tecnicos.push({ value: this.visita.visitaFieldata["Visitas::Tec8"], text: this.visita.visitaFieldata["Visitas::TecNom8"] })

    // Aqui se le asigna por defecto como tecnico el tecnico que se a logeado
    this.tecnicos.push({ value: this.$store.state.User.CódigoFM, text: this.nombreTecnico })
    this.tecnicoSeleccionado = this.$store.state.User.CódigoFM;
    this.form.HoraInicio = this.getCurrentTime();

    // Obtener técnicos
    /*this.$axios.$get("/api/usuarios/list", {
      headers: {
        Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
      },
    }).then(response => {
      console.log(response)
    }).catch(error => {
      console.log(error)
    })*/

  },
};
</script>

<style>
.login-text {
  margin-left: 12px;
  margin-right: 12px;
}

.new-data-form-parent {
  justify-content: center;
  bottom: 0;
}

.new-data-form {
  background-color: var(--color);
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.new-data-form textarea {
  width: 100%;
  height: 150px;
}

#submit {
  background-color: black;
  color: var(--color);
  height: 50px;
  font-size: 18px;
  width: 100%;
  border: none;
  border-radius: 10px;
}

.margin-top {
  margin-top: 150px;
}

.form-option {
  margin-left: 12px;
  margin-right: 12px;
}

.form-input {
  background-color: var(--bg);
  border: none;
  border-radius: 6px;
  height: 50px;
  width: 100%;
}

.form-input[type="time"] {
  width: 95vw;
}

.textarea {
  resize: none;
  background-color: var(--bg);
  border: none;
  border-radius: 6px;
  border: none;
}

input[disabled] {
  background-color: #e9ecef;
  padding-left: 10px;
}

/* SPINNER */
@keyframes spinner {
  0% {
    transform: translate3d(-50%, -50%, 0) rotate(0deg);
  }

  100% {
    transform: translate3d(-50%, -50%, 0) rotate(360deg);
  }
}

.spin {
  margin: auto;
  margin-bottom: 1rem;
}

.spin::before {
  animation: 1.5s linear infinite spinner;
  animation-play-state: inherit;
  border: solid 5px #cfd0d1;
  border-bottom-color: white;
  border-radius: 50%;
  content: "";
  height: 40px;
  width: 40px;
  position: absolute;
  transform: translate3d(-50%, -50%, 0);
  will-change: transform;
}
</style>
