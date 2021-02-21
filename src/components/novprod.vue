<template lang="html">

  <section class="novprod container-fluid container-md">
    <h2>Novedades</h2>
    <section class="container-fluid container-md cards">
      <div v-for="novedad in arrayNovedades"
           :key="novedad.id"
           class="card p-3">
        <img :src="novedad.src" class="card-img-top" :alt="novedad.nombre" data-toggle="modal" :data-target="novedad.target">
        <div class="card-body p-0">
          <h5 class="card-title" data-toggle="modal" :data-target="novedad.target">{{novedad.nombre}}</h5>
          <a class="btn btn-primary">Add cart</a>
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
              </div>
              <div class="modal-footer">
                <a class="btn btn-primary">Add cart</a>
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
          <a class="btn btn-primary"
            @click="agregarCarrito(producto)">Add cart</a>
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
                <a  class="btn btn-primary">Add cart</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  </section>

</template>

<script lang="js">
import {db} from '../db.js'

import { eventBus } from '../event-bus.js' 

  export default  {
    name: 'novprod',
    props: [
      
    ],
    mounted () {

    },
    data () {
      return {
        listaProductos:[],
        listaCarrito:[]
        
      }
    },
    methods: {
      agregarCarrito:function(elemento){
        this.listaCarrito.push(elemento);
        eventBus.$emit('arrayCarrito', this.listaCarrito);
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
      }
      
    },
    firestore:{
      listaProductos:db.collection('productos')
    }
}


</script>

<style scoped lang="scss">
  @import "../scss/main.scss";
</style>
