<template>
  <div id="app">
    <cabecera/>
    <transition name="fade">
      <router-view></router-view>
    </transition>
    <pie/>
    <notifications group="foo"/>
  </div>
</template>

<script>
import cabecera from './components/cabecera.vue'
import pie from './components/pie.vue'

export default {
  name: 'App',
  components: {
    cabecera,
    pie 
  }
}
</script>

<style scoped lang="scss">

@import "scss/main.scss";

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>
