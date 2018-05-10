<template>
  <transition name="fade">
    <div class="newLoadingWarp">
      <spinner type="android" class="newLoading"></spinner>
    </div>
  </transition>
</template>

<script type="es6">
  import {Spinner} from 'vux'

  export default {
    components: {
      Spinner
    },
    data() {
      return {}
    },
    methods: {},
    mounted() {

    }
  }
</script>

<style>
  .newLoadingWarp {
    width: 100%;
    height: 100%;
    background: #fff;
    position: relative;
  }

  .newLoading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
</style>
