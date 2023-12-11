<template>
  <div class="login-div">
      <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: "login"
}
</script>

<style scoped>
body {
  background-color: var(--bg)
}
label,
span {
  color: rgb(110, 110, 110);
}
.login-div{
  max-width: 432px;
}

</style>