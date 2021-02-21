<template lang="html">

  <section class="login">
    <h2>Iniciar sesión</h2>
    <form>
      <div>
        <label for="email">Correo electrónico: </label>
        <input type="email" id="email">
      </div>
      <div>
        <label for="password">Contraseña: </label>
        <input type="password" id="password">
      </div>
    </form>

    <p>Inicar sesión con:
      
    </p>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'login',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  @import "../scss/main.scss";
</style>
