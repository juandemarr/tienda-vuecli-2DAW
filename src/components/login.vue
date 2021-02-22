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
      <button class="btn" @click='iniciarCorreo(email,password)'>Iniciar sesion</button>
      <button class="btn" @click='registro(email,password)'>Registrarse</button>
    </form>

    <p>Inicar sesión con:</p>
    <button class="logginGoogle" @click="login"><i class="fab fa-google"></i></button>
  </section>

</template>

<script lang="js">
/* import {db}  from '../db.js'; */
/*para el logeo*/
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
        password:"",
      }
      
    },

    mounted(){
      firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
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
        /* if(this.authenticated)
          this.$router.push('/'); */
      },

      registro:function(email,password){
        //console.log("antes de enviar: "+email +" " +password);
        firebase.registrarseBD(email,password);
          if(this.authenticated){
            this.$router.push('/');
          }
      },

      iniciarCorreo:function(email,password){
        firebase.loginCorreo(email,password);
      }
    },
    computed: {
      authenticated(){
          return this.user.loggedIn
      }
      /* firstName(){
        if (this.user.data.displayName) {
          return this.user.data.displayName.split(' ')[0]
        }
        return null
      } */
    }
    
}


</script>

<style scoped lang="scss">
  @import "../scss/main.scss";
</style>
