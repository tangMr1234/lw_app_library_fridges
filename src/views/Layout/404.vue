<template>
  <div style="height:100%;">
    <!-- 图片+提示文字 -->
    <flexbox>
      <flexbox-item>
        <div class="flex-demo">
          <x-img :src="src" :default-src="src" :offset="-100"></x-img>
          <divider style="font-size:18px;font-weight: bold;color:# 3EA9F5;">{{Nofound.title}}</divider>
          <div v-html='Nofound.content'></div>
        </div>
      </flexbox-item>
    </flexbox>
    <!-- 底栏按钮 -->
    <tabbar>
      <tabbar-item @click.native="$router.go(-1)">
        <span slot="label">返回上层</span>
      </tabbar-item>
      <tabbar-item link="/login" style="border-left: 1px solid #DCDCDC;border-right: 1px solid #DCDCDC;">
        <span slot="label">重新登录</span>
      </tabbar-item>
      <tabbar-item link="/">
        <span slot="label">返回首页</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script type="es6">

  export default {
    data() {
      return {
        src: "http://www.100sucai.com/democode/1670/images/banner.png",
        Nofound: {
          title: "冷王科技提醒您",
          content: "你访问的页面丢失了！可进行如下操作 :<br>1、检查网络是否出错<br>2、联系管理员或客服<br>3、访问系统其他页面"
        }
      }
    },
    methods: {},
    mounted() {
      this.loadingRemove();
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/1px.less';

  .flex-demo {
    text-align: center;
  }
</style>
