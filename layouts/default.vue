<template>
    <div id="div-parent">
      <Topbar/>
      <div>
          <Nuxt />
      </div>
    </div>
</template>
<script>
export default {
  middleware: "authentication"
}
</script>

<style>
html {
    font-family: "Poppins";
    --color: white;
    --bg: rgb(241, 241, 241);
    --bg-secondary: rgb(110, 110, 110);
    --warning: #FF6E31;
    --success: #38E54D;
    --error: #CF0A0A;
    box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  background-color: var(--bg)
}
label,span {
  color: var(--bg-secondary);
}
span {
  font-size: 14px;
}
.warning-text {
  color: var(--warning);
}
.error-text {
  color: var(--error);
}
.success-text {
  color: var(--success);
}
#div-parent {
  flex-direction: column;
  display: flex;
  justify-items: center;
  align-items: stretch;
  justify-content: center;
  max-width: 100%;
}
.lista-tareas {
  background-color: var(--color);
  width: -webkit-fill-available;
}
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
}
.no-data svg {
  margin-top: 1rem;
}
.ocultar-tareas {
  display: none !important;
  height: 0 !important;
}
.spinner-parent {
  width: 100%;
  height: 100%;
  margin-top: 50px;
  text-align: center;
  position: fixed;
}
.spinner-border {
  width: 100px;
  height: 100px;
}

.store-loading {
  
  animation-name: parpadeo;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  -webkit-animation-name:parpadeo;
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
}

.etiquetas > * {
  background-color: rgb(211, 211, 211);
  color: black;
  font-size: 17px;
  font-weight: lighter;
  padding: 0.4rem;
  margin-top: 5px;
}

.boton-retorno {
  margin-left: 10px;
}

.boton-retorno span {
  font-size: 20px;
  text-decoration: underline;
}

.boton-retorno svg {
  width: 20px;
}

.mes-texto {
  font-size: 15px;
}

.dia-mes {
  font-size: 40px
}

@-moz-keyframes parpadeo{  
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}

@-webkit-keyframes parpadeo {  
  0% { opacity: 1.0; }
  50% { opacity: 0.0; }
   100% { opacity: 1.0; }
}

@keyframes parpadeo {  
  0% { opacity: 1.0; }
   50% { opacity: 0.0; }
  100% { opacity: 1.0; }
}
</style>