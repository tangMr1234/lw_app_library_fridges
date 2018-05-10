<template>
  <div class="xHeaderRight" style="height:100%;">
    <view-box ref="viewBox" :body-padding-bottom="(!$route.meta.tabbar)?'0': ''">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <!-- 底栏菜单 -->
      <tabbar slot="bottom"
              v-for="(data,index) in $router.options.routes" :key="index"
              v-if="!data.hidden&&$route.meta.tabbar!=false">
        <tabbar-item v-if="!item.hidden"
                     v-for="(item,index) in data.children"
                     :key="index"
                     :link="item.path"
                     :selected="active() === item.path">
          <i slot="icon" class="iconfont" :class="item.icon"></i>
          <span slot="label">{{item.name}}</span>
        </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {}
    },
    methods: {
      //设置底栏高亮项
      active() {
        return '/' + this.$route.path.split("/")[1];
      },
    },
    mounted() {

    }
  }
</script>
<style>

</style>
