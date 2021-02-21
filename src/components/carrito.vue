<template lang="html">

  <section class="carrito">
    <div :agregar="obtenerArrayCarrito">
    
    </div>
  </section>

</template>

<script lang="js">

  export default  {
    name: 'carrito',
    props: [],
    mounted () {

    },
    data () {
      return {
        nuevoArrayCarrito:[]
      }
    },
    methods: {
      obtenerArrayCarrito:function(array){
        this.nuevoArrayCarrito=array;
        console.log(array)
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="scss">
  @import "../scss/main.scss";  
</style>
