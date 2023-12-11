<template>
  <b-col class="margin-top">
    <b-row class="ml-1">
      <img class="logo-login mb-4 ml-2" src="logo.png" />
    </b-row>
    <b-row class="login-parent">
      <div class="login mb-4">
          <div class="login-text my-4">
            <h4><b>Bienvenido de nuevo</b></h4>
            <span id="texto-bienvenida">Inicie sesión para ver su portal</span>
          </div>
          <form class="mb-2 mt-2" @submit.prevent="handleSubmit()">
            <p v-if="mostrarErrores === true" class="error-message">Usuario o contraseña incorrectos, inténtelo de nuevo</p>
            <b-row class="form-option mb-1">
              <label>Usuario</label>
              <b-form-input placeholder="usuario1234" class="form-input" v-model="form.usuario" type="text" name="usuario" />
            </b-row>

            <b-row class="form-option mb-1">
              <label>Contraseña</label>
              <b-form-input placeholder="......" class="form-input" v-model="form.password" type="password" name="password" />
            </b-row>

            <b-row class="form-option my-4">
              <button v-if="login === false" type="submit" id="submit"><h4 id="submit-texto"><b>Acceder</b></h4></button>
              <div v-if="login === true" class="spinner-parent-login">
                <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
                <p>Cargando...</p>
              </div>
            </b-row>
            
          </form>
      </div>
    </b-row>
  </b-col>
</template>

<script>

export default {
  layout: 'login',
  data() {
    return {
      form: {
        usuario: "",
        password: ""
      },
      mostrarErrores: false,
      login: false
    }
  },
  methods: {
    async handleSubmit() {
      try {
        this.login = true;
        const credenciales = {"usuario": this.form.usuario, "password": this.form.password}

        if (!credenciales.usuario || !credenciales.password) {
          this.mostrarErrores = true;
          this.login = false;
        };

        const response = await this.$axios.$post('/api/usuarios/login', credenciales)
        
        if (response) {
          this.login = false;
          this.$cookies.set("TOKEN", response);
          this.$store.commit('saveUser', credenciales);
          this.$router.push('/');
        }
      } catch (error) {
        console.log("Error al hacer la llamada", error)
        this.mostrarErrores = true;
        this.login = false;
        return
      }
    }
  }
};
</script>

<style>
.login {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;
  margin-top: 20px;
  margin-right: 16px;
  margin-left: 16px;
  gap: 1rem;
}
.login-text {
  margin-left: 12px;
  margin-right: 12px;
}
.login-parent {
  background-color: var(--color);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 500px;
}
.logo-login {
  max-width: 250px;
}
#submit {
  background-color: black;
  color: var(--color);
  height: 60px;
  font-size: 18px;
  width: 100%;
  border: none;
  text-align: center;
  border-radius: 10px;
  margin-top: 1rem;
}
#submit > {
  margin-top: 16px;
  margin-bottom: 16px;
}
#submit-texto {
  margin-bottom: auto;
  margin-top: auto;
}
@media (max-height: 750px) {
  .margin-top {
    margin-top: 80px;
  }
}
@media (min-height: 751px) {
  .margin-top {
    margin-top: 130px;
  }
}
.form-option {
  margin-left: 12px;
  margin-right: 12px;
  margin-bottom: 20px !important;
}
.form-input {
  background-color: var(--bg);
  border: none;
  border-radius: 6px;
  height: 50px;
  width: -webkit-fill-available;
}
#texto-bienvenida {
  font-size: 18px !important;
}

.spinner-parent-login {
  width: 100%;
  height: 100%;
  text-align: center;
  margin: auto !important;
}
.spinner-parent-login .spinner-border {
  width: 100px;
  height: 100px;
}
.error-message {
  color: red;
  margin-left: 12px;
  margin-right: 12px;
}
</style>
