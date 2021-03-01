<template lang="html">

  <section class="login">
    <h2>Iniciar sesión</h2>
    <form>
      <div>
        <label for="email">Correo electrónico: </label>
        <input type="email" id="email" v-model="email">
      </div>
      <div>
        <label for="password">Contraseña: </label>
        <input type="password" id="password" v-model="password">
      </div>
      <a class="btn" @click='iniciarCorreo(email,password)'>Iniciar sesion</a>
      <a class="btn" @click='registro(email,password)'>Registrarse</a>
    </form>

    <p>Inicar sesión con:</p>
    <button class="loginGoogle" @click="login"><i class="fab fa-google"></i></button>
  </section>

</template>

<script lang="js">

import firebase from '../db.js'

  export default  {
    name: 'login',
    props: [],
    
    data () {
      return {
        user: {
          loggedIn: false,
          data: {}
        },
        email:"",
        password:""
      }
      
    },

    mounted(){
      firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
          this.$router.push("/");
        }
        else {
          this.user.loggedIn = false;
          this.user.data = {};
        }
      })
      
    },
    
    methods: {
      login:function(){
        firebase.login();
      },

      registro:function(email,password){
        firebase.registrarseBD(email,password);
      },

      iniciarCorreo:function(email,password){
        firebase.loginCorreo(email,password);
      }
    },
    computed: {
      authenticated(){
          return this.user.loggedIn
      },
    }
}


</script>

<style scoped lang="scss">
  @import "../scss/main.scss";
</style>
