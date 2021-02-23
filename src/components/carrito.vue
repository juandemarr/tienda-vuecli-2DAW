<template lang="html">

  <section class="carrito container-fluid container-md">
    <div v-for="elementoCarrito in listaCarrito"
         :key="elementoCarrito.id">
         <div class="elemento">
            <img :src="elementoCarrito.imagen" :alt="elementoCarrito.nombre">
            <div class="texto">
                <p>{{elementoCarrito.nombre}}</p>
                <p>Cantidad: {{elementoCarrito.cantidad}}</p>
                <p>{{elementoCarrito.precio}} €</p>
            </div>
         </div>
         <a @click="restarUno(elementoCarrito.cantidad, elementoCarrito.precio, elementoCarrito.id)" class="btn">Quitar</a>
    </div>

    <section class="pieCarrito">
      <p>Total: {{total}} €</p>
      <a class="btn btn-primary" @click="comprarTodo">Comprar</a>
    </section>
    
  </section>

</template>

<script lang="js">

import firebase from '../db.js'
import {db} from '../db.js'
  export default  {
    name: 'carrito',
    props: [],
    mounted () {
      firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
        } else {
          this.user.loggedIn = false;
        }
      });
    },

    data () {
      return {
        user: {
          loggedIn: false,
          data: {}
        },
        listaCarrito:[]
      }
      
    },
    methods: {
      
      restarUno:function(cantidadTotal,precioTotal, id){
        let nuevaCantidad,nuevoPrecio;

        if(cantidadTotal>0){
          nuevaCantidad=cantidadTotal-1;
          nuevoPrecio=precioTotal/2;
          db.collection('listaCarrito').doc(id).update({cantidad:nuevaCantidad,precio:nuevoPrecio});
        }
        else{
          db.collection('listaCarrito').doc(id).delete();
        }
        this.$notify({
          group: 'foo',
          title: '¡Cuidado!',
          type:'warn',
          text:'Has perdido un elemento :('
        });
      },
      comprarTodo:function(){
        if(this.listaCarrito.length>0){
          db.collection('listaCarrito').delete();
          this.$notify({
            group: 'foo',
            title: 'Carrito vacio',
            type:'success',
            text:'Se ha comprado todo el carrito'
          });
        }
      }
      
    },
    computed: {
      total(){
        let totalPrecio=0;
        for(let i=0; i<this.listaCarrito.length; i++){
          totalPrecio=totalPrecio+this.listaCarrito[i].precio;
        }
        return totalPrecio;
      }
    },
    firestore:{
      listaCarrito:db.collection('listaCarrito')//.where("email","==",firebase.auth.currentUser ? firebase.auth.currentUser.email:"")
    }
}


</script>

<style scoped lang="scss">
  @import "../scss/main.scss";  
</style>
