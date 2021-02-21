<template lang="html">

  <section class="carrito">
    <div>{{agregar}}
    </div>
  </section>

</template>

<script lang="js">
import novprod from './novprod.vue'

  export default  {
    name: 'carrito',
    props: ['agregar'],
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
