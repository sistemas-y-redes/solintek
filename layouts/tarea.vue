<template>
    <div class="mx-2">
        <div class="my-4 mx-2">
            <Topbar/>
        </div>
        <b-row>
            <Nuxt />
        </b-row>
        
    </div>
</template>

<style>
html {
    font-family: "Poppins";
    box-sizing: border-box;
    --color: white;
    --bg: rgb(241, 241, 241);
    --bg-secondary: rgb(110, 110, 110);
    box-sizing: border-box;
}
*, *:before, *:after {
  box-sizing: inherit;
}
body {
  background-color: var(--bg)
}
label,
span {
  color: rgb(110, 110, 110);
}
span {
  font-size: 14px;
}

.lista-tareas {
  background-color: var(--color);
  width: -webkit-fill-available;
}

.añadir {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
  position: sticky;
  bottom: 0;
  padding-left: 40px;
  padding-bottom: 42px;
  font-size: 20px;
}
.añadir a{
  color: black;
}
@media (min-width: 375px) and (max-width: 424px) {
  .texto-tarea {
    max-width: 200px;
  }
}
@media (min-width: 320px) and (max-width: 375px) {
  .texto-tarea {
    max-width: 180px;
  }
}
</style>