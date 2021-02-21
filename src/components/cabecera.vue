<template>

  <section class="cabecera">

    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="navbar-brand">
        <a href="#/"><img class="logo mr-2" src="../../public/phoenix2.svg" alt="Logo PhoneixGames">PhoenixGames</a>
      </div>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="#/login">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Register</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#/carrito">Shopping Cart</a>
          </li>
        </ul>
      </div>
    </nav>

  </section>

</template>

<script lang="js">
/* import carrito from './components/carrito.vue' */

  export default  {
    name: 'cabecera',
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

    },
    components:{
          /* carrito */
    }
}


</script>

<style scoped lang="scss">
  @import "../scss/main.scss";
</style>
