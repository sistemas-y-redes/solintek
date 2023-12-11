<template>
  <div class="new-data-form-parent">
    <form class="new-data-form" @submit.prevent="handleSubmit()">
      <!-- Input de Fecha -->
      <b-row class="form-option my-4">
        <label v-if="!errorFecha">Fecha</label>
        <label v-else
          >Fecha <span>Debes introducir una fecha válida</span></label
        >
        <b-form-datepicker
          v-model="form.Fecha"
          :value="min"
          :min="min"
          class="form-input"
          type="text"
          name="fecha"
          :placeholder="form.Fecha"
          disabled
        />
      </b-row>
      <b-row class="form-option my-3">
        <label>Técnico</label>
         <b-form-select v-model="tecnicoSeleccionado" :options="tecnicos"></b-form-select>
      </b-row>
      <!-- Input de Hora Inicio -->
      <b-row class="form-option my-3">
        <label v-if="!errorHoraInicio">Hora Inicio</label>
        <label v-else
          >Hora Inicio <span>Debes introducir una hora válida</span></label
        >
        <input
          v-model="form.HoraInicio"
          class="form-input"
          type="time"
          name="hora-inicio"
          placeholder=""
          required
        />
      </b-row>
      <!-- Input de Hora Final -->
      <b-row class="form-option my-3">
        <label v-if="!errorHoraFinal">Hora Fin</label>
        <label v-else
          >Hora Fin <span>Debes introducir una hora válida</span></label
        >
        <input
          v-model="form.HoraFin"
          class="form-input"
          type="time"
          name="hora-fin"
          placeholder=""
        />
      </b-row>

      <!-- Input de Descripción -->
      <b-row class="form-option my-3">
        <label v-if="!errorDescripcion">Descripción</label>
        <label v-else
          >Descripción
          <span>Debes introducir una descripción válida</span></label
        >
        <b-form-textarea
          v-model="form.Descripcion"
          class="textarea"
          placeholder="Introduce la acción realizada"
          :state="
            form.Descripcion.length >= 10 && form.Descripcion.length <= 50
          "
          required
        ></b-form-textarea>
      </b-row>
      <!-- Botón de submit -->
      <b-row class="form-option my-4">
        <button
          v-if="this.loading === false"
          class="mb-4"
          type="submit"
          id="submit"
        >
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
        Fecha: new Date().toISOString().slice(0, 10),
        HoraInicio: "",
        HoraFin: "",
        Descripcion: this.visita[0].fieldData.TrabajoRealizado,
        NumeroServicioVisita: this.visita[0].fieldData["NumeroVisita"],
        NumeroServicio: this.visita[0].fieldData["NumeroServicio"],
        Tec: this.$store.state.User,
        Tipo: "M.Obra",
      },
      numeroTecnico: this.$store.state.User,
      nombreTecnico: this.visita[0].fieldData.TécnicoNombre,
      errorFecha: false,
      errorHoraInicio: false,
      errorHoraFinal: false,
      errorDescripcion: false,
      min: minDate,
      loading: false,
      tecnicoSeleccionado: ""
    };
  },
  methods: {
    async handleSubmit() {
      let errorMostrar = "";

      if (this.form.Fecha.length === 0) {
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

      if (this.form.Descripcion.length === 0) {
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
        title: "Enviado a Filemaker",
        confirmButtonColor: "#000",
        text: `Se ha enviado a Filemaker y será insertado en breves`,
      }).then(() => {
        window.location.href = window.location.href
      });

      this.form.Fecha = "";
      this.form.HoraInicio = "";
      this.form.HoraFin = "";
      this.form.Descripcion = "";
      this.loading = false;
    },
    getCurrentTime() {
      const now = new Date();
      let hours = now.getHours().toString().padStart(2, '0');
      let minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
  },
  mounted() {
    this.tecnicos.push({value: this.numeroTecnico, text: this.nombreTecnico})
    if (this.visita.visitaFieldata["Visitas::Tec2"]) this.tecnicos.push({value: this.visita.visitaFieldata["Visitas::Tec2"], text: this.visita.visitaFieldata["Visitas::TecNom2"]})
    if (this.visita.visitaFieldata["Visitas::Tec3"]) this.tecnicos.push({value: this.visita.visitaFieldata["Visitas::Tec3"], text: this.visita.visitaFieldata["Visitas::TecNom3"]})
    if (this.visita.visitaFieldata["Visitas::Tec4"]) this.tecnicos.push({value: this.visita.visitaFieldata["Visitas::Tec4"], text: this.visita.visitaFieldata["Visitas::TecNom4"]})
    if (this.visita.visitaFieldata["Visitas::Tec5"]) this.tecnicos.push({value: this.visita.visitaFieldata["Visitas::Tec5"], text: this.visita.visitaFieldata["Visitas::TecNom5"]})
    if (this.visita.visitaFieldata["Visitas::Tec6"]) this.tecnicos.push({value: this.visita.visitaFieldata["Visitas::Tec6"], text: this.visita.visitaFieldata["Visitas::TecNom6"]})
    if (this.visita.visitaFieldata["Visitas::Tec7"]) this.tecnicos.push({value: this.visita.visitaFieldata["Visitas::Tec7"], text: this.visita.visitaFieldata["Visitas::TecNom7"]})
    if (this.visita.visitaFieldata["Visitas::Tec8"]) this.tecnicos.push({value: this.visita.visitaFieldata["Visitas::Tec8"], text: this.visita.visitaFieldata["Visitas::TecNom8"]})

    // Aqui se le asigna por defecto como tecnico el tecnico que se a logeado
    this.tecnicoSeleccionado = this.$store.state.User;
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

    console.log(this.tecnicos)
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
