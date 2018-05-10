<template>
  <div id="app" style="height:100%;">
    <router-view class="router-view"></router-view>
    <loading v-model="isLoading"></loading>
  </div>
</template>

<script type="es6">
  import {mapState} from 'vuex'

  export default {
    name: 'app',
    data() {
      return {}
    },
    computed: {
      ...mapState({
        isLoading: state => state.vux.isLoading
      })
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/tap.less';

  body {
    background-color: #fbf9fe;
  }

  .router-view {
    width: 100%;
  }
</style>
