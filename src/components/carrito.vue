<template lang="html">

  <section class="carrito">

    {{nuevoArrayCarrito}}
 
    <div></div>
  </section>

</template>

<script lang="js">
import { eventBus } from '../event-bus.js' 

  export default  {
    name: 'carrito',
    props: [],
    mounted () {

    },
    created(){
      eventBus.$on('arrayCarrito', (array) => {
        this.nuevoArrayCarrito=array;
      })
    },
    data () {
      return {
        nuevoArrayCarrito:[]
      }
    },
    methods: {
      /* obtenerArrayCarrito:function(array){
        this.nuevoArrayCarrito=array;
        console.log(array)
      }, */

      
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  @import "../scss/main.scss";  
</style>
