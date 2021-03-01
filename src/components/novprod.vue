<template lang="html">

  <section v-if="listaProductos!=''" class="novprod container-fluid container-md">
    <h2>Novedades</h2>
    <section class="container-fluid container-md cards">
      <div v-for="novedad in arrayNovedades"
           :key="novedad.id"
           class="card p-3">
        <img :src="novedad.src" class="card-img-top" :alt="novedad.nombre" data-toggle="modal" :data-target="novedad.target">
        <div class="card-body p-0">
          <h5 class="card-title" data-toggle="modal" :data-target="novedad.target">{{novedad.nombre}}</h5>
          <p>{{novedad.precio}}€</p>
          <button :disabled="deshabilitarBoton(novedad)" v-if="authenticated" class="btn btn-primary" @click="agregarCarrito(novedad)">Añadir <i class="fas fa-shopping-cart"></i></button>
          <router-link to="/login" class="btn btn-primary" v-if="!authenticated">Añadir <i class="fas fa-shopping-cart"></i></router-link>
        </div>

        <div class="modal fade" :id="novedad.ref" tabindex="-1"  aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{novedad.nombre}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img :src="novedad.src2" :alt="novedad.nombre">
                <p>{{novedad.descripcion}}</p>
                <p>En stock: {{novedad.stock}}</p>
              </div>
              <div class="modal-footer">
                <a v-if="authenticated" class="btn btn-primary" @click="agregarCarrito(novedad)">Añadir <i class="fas fa-shopping-cart"></i></a>
                <router-link to="/login" class="btn btn-primary" v-if="!authenticated">Añadir <i class="fas fa-shopping-cart"></i></router-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>

    <h2>Productos</h2>
    <section class="container-fluid cards productos">
      <div v-for="producto in arrayProductos"
           :key="producto.id"
           class="card p-3">
        <img :src="producto.src" class="card-img-top" :alt="producto.nombre" data-toggle="modal" :data-target="producto.target">
        <div class="card-body p-0">
          <h5 class="card-title" data-toggle="modal" :data-target="producto.target">{{producto.nombre}}</h5>
          <p>{{producto.precio}}€</p>
          <a v-if="authenticated" class="btn btn-primary" @click="agregarCarrito(producto)">Añadir <i class="fas fa-shopping-cart"></i></a>
          <router-link to="/login" class="btn btn-primary" v-if="!authenticated">Añadir <i class="fas fa-shopping-cart"></i></router-link>
        </div>

        <div class="modal fade" :id="producto.ref" tabindex="-1"  aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">{{producto.nombre}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <img :src="producto.src2" :alt="producto.nombre">
                <p>{{producto.descripcion}}</p>
                <p>En stock: {{producto.stock}}</p>
              </div>
              <div class="modal-footer">
                <a v-if="authenticated" class="btn btn-primary" @click="agregarCarrito(producto)">Añadir <i class="fas fa-shopping-cart"></i></a>
                <router-link to="/login" class="btn btn-primary" v-if="!authenticated">Añadir <i class="fas fa-shopping-cart"></i></router-link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </section>

  <section v-else class="novprod container-fluid container-md">
    <div class="spinner-grow colorSpinner" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </section>
</template>

<script lang="js">
import {db} from '../db.js'
import firebase from '../db.js'

  export default  {
    name: 'novprod',
    props: [
      
    ],
    mounted () {
      firebase.auth.onAuthStateChanged( user => {
        if (user) {
          this.user.loggedIn = true;
          this.user.data = user;
          this.$bind('listaCarrito',db.collection('listaCarrito').where("email","==",firebase.auth.currentUser ? firebase.auth.currentUser.email : ""))
        } else {
          this.user.loggedIn = false;
          this.$bind('listaCarrito',db.collection('listaCarrito').where("email","==", ""))
        }
      });
    },

    data () {
      return {
        listaProductos:[],
        user: {
          loggedIn: false,
          data: {}
        },
        listaCarrito:[]
      }
    },
    methods: {
      agregarCarrito:function(producto){

        if(this.listaCarrito.length==0){
          db.collection('listaCarrito').add({
              nombre:producto.nombre,
              imagen:producto.src,
              cantidad:1,
              email:this.user.data.email,
              precio:producto.precio
            });
        }else{
          for(let i=0; i<this.listaCarrito.length; i++){
            if(producto.nombre==this.listaCarrito[i].nombre){
              let cantidad=this.listaCarrito[i].cantidad+1;
              let precio=this.listaCarrito[i].precio*2;

              db.collection('listaCarrito').doc(this.listaCarrito[i].id).update({cantidad:cantidad,precio:precio});
              
            }else{
              db.collection('listaCarrito').add({
                nombre:producto.nombre,
                imagen:producto.src,
                cantidad:1,
                email:this.user.data.email,
                precio:producto.precio
              });
            }
          }
        }
        this.$notify({
          group: 'foo',
          title: 'Ver carrito',
          type:'success',
          text:'Se ha añadido un elemento al carrito'
        });
      },

      deshabilitarBoton:function(elemento){
        if(elemento.stock==0){
          return true;
        }else{
          return false;
        }
        
      }

    },
    computed: {
      arrayNovedades(){
        let lista=this.listaProductos.filter(nov=> {
          return nov.novedad;
        });
        return lista;
      },

      arrayProductos(){
        let lista=this.listaProductos.filter(prod=> {
          return !prod.novedad;
        });
        return lista;
      },

      authenticated(){
        return this.user.loggedIn
      }
      
    },
    firestore:{
      listaProductos:db.collection('productos'),
      listaCarrito:db.collection('listaCarrito').where("email","==",firebase.auth.currentUser ? firebase.auth.currentUser.email : "")
    }
}


</script>

<style scoped lang="scss">
  @import "../scss/main.scss";
</style>
