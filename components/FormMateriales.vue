<template>
  <div class="new-data-form-parent">
    <form class="new-data-form" @submit.prevent="handleSubmit()">
      <!-- Input de Fecha -->
      
      <!-- Input de Hora Inicio -->
     
      <!-- Input de Unidades -->
      <b-row class="form-option my-3">
        <label v-if="!errorUnidades">Nº Unidades</label>
        <label v-else
          >Unidades
          <span>Debes introducir un número de unidades</span></label
        >
        <b-form-input
          v-model="form.Unidades"
          class="number"
          type="number"
          placeholder="Introduce un número de unidades"
          required
        ></b-form-input>
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
          placeholder="Introduce el material que quieres añadir"

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

    return {
      form: {
        Descripcion: "",
        Unidades: null,
        NumeroServicioVisita: this.visita[0].fieldData["NumeroVisita"],
        NumeroServicio: this.visita[0].fieldData["NumeroServicio"],
        Tec: this.$store.state.User,
        Tipo: ""
      },
      errorUnidades: false,
      errorDescripcion: false,
      loading: false,
    };
  },
  methods: {
    async handleSubmit() {
      let errorMostrar = "";

      if (this.form.Unidades.length === 0) {
        errorMostrar = "comprueba las unidades"
        throw error;
      }

      if (this.form.Descripcion.length === 0) { 
        errorMostrar = "comprueba la descripción"
        throw error
      }
      
      const formulario = { ...this.form };
      this.loading = true;
      
      this.$axios.$post(`/api/visitas/${this.visita[0].fieldData["Numero"]}/seguimiento`,
      {
        formulario,
        headers: {
          Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
        },
      })
      .then(response => {

      })
      .catch (e => {
        console.log("Error", e);
        errorMostrar = "no se ha podido subir el seguimiento"
        Swal.fire({
          icon: "error",
          title: "Oops...",
          confirmButtonColor: "#000",
          text: `¡Algo ha ido mal, ${errorMostrar}! Inténtalo de nuevo.`,
        });
      })

      Swal.fire({
        icon: "success",
        title: "Enviado a Filemaker",
        confirmButtonColor: "#000",
        text: `Se ha enviado a Filemaker y será insertado en breves`,
      });

      this.form.Descripcion = "";
      this.form.Unidades = "";
      this.loading = false;
    }
  },
  mounted() {

  }
};
</script>

<style scoped>
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

.form-input[type=time] {
  width: 95vw;
}

.textarea {
  resize: none;
  background-color: var(--bg);
  border: none;
  border-radius: 6px;
  border: none;
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
