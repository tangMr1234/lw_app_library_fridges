<template>
  <div style="width:100%;height: 100%;overflow: hidden;" v-cloak>
    <x-header slot="header" :title="this.$route.name" @on-click-back="goBack" :left-options="{preventGoBack: true}"
              style="width:100%;background-color:#409eff;">
      <a slot="right" style="color:#fff;" @click="show">
        <i class="iconfont icon-sousuo" style="font-size:20px;"></i>
        <small style="vertical-align: top;">筛选</small>
      </a>
    </x-header>
    <!-- 数据展示列表 -->
    <flexbox :gutter="0" style="height: 100%;overflow: hidden;">
      <!-- 左侧菜单 -->
      <flexbox-item :span="1/4" style="height: 100%;overflow: hidden;background:#f2f2f2;">
        <b-scroll class="wrapper" style="height:100%;">
          <div class="content">
            <group v-if="FridgesMenu.MenuData">
              <cell v-for="(item, index) in FridgesMenu.MenuData" :key="index" :title="item.label"
                    style="background:#f2f2f2;"
                    :class="{leftMenuActive: item.id==FridgesMenu.selected }"
                    @click.native="leftMenuClick(item.id)">
                <i slot="icon" v-if="item.icon&&item.icon!=''" :class="'iconfont'+' '+item.icon"
                   style="background:#fe4a1e;padding:2px;margin-right:4px;font-size:12px;color:#fff;border-radius:3px;"></i>
              </cell>
            </group>
          </div>
        </b-scroll>
      </flexbox-item>
      <!-- 右侧数据 -->
      <flexbox-item :span="3/4" style="height: 100%;position: relative;background:#fff;">
        <b-scroll class="wrapper" style="height:100%;">
          <div class="content">
            <panel :list="FridgesIndexData.list" :type="FridgesIndexData.type"
                   @on-click-item="showPopupComment"></panel>
            <new-loading v-show="loadingShow" style="position:absolute;width:100%;top:0;left:0;"></new-loading>
          </div>
        </b-scroll>
      </flexbox-item>
    </flexbox>
    <!-- 筛选弹出层 -->
    <div v-transfer-dom>
      <popup v-model="popup_show" position="right" :width="popupWidth">
        <div style="height:100%;">
          <component slot="Popup" :is="component" @reset="submitLoad"></component>
        </div>
      </popup>
    </div>
  </div>
</template>

<script type="es6">
  import NewLoading from '@/components/loading.vue';
  import SFilter from '@/views/Popup/Filter.vue'
  import {getFridgesIndexMenu, getFridgesIndexList} from '@/api/api';

  export default {
    components: {
      NewLoading,
      SFilter
    },
    data() {
      return {
        component: "", //加载组件
        popupWidth: '87%', //弹出层的宽度设置
        loadingShow: true, //右侧数据加载时的loading
        popup_show: false, //筛选弹出窗
        FridgesMenu: {}, //侧边栏数据
        FridgesIndexData: {}, //右侧列表数据
      }
    },
    methods: {
      //  通过postMessage调用iframe父组件的方法
      goBack() {
        let link = parent.window.location.href.split("#");
        window.parent.postMessage('closeLwFrame', link[0]);
      },
      //打开详情
      showPopupComment(item) {
        this.$router.push({
          path: 'fridges_detail',
          query: {
            id: item.id
          }
        });
      },
      //打开筛选
      show() {
        this.component_loadingShow = true;
        this.component = "s-filter";
        this.popup_show = true;
        setTimeout(() => {
          this.component_loadingShow = false;
        }, 1000);
      },
      //弹出的子组件filter调用的父组件index的方法
      submitLoad() {
        this.popup_show = false;
        this.getIndexMenuData();
      },
      //左侧菜单点击事件
      leftMenuClick(id) {
        if (this.FridgesMenu.selected !== id) {
          this.getIndexListData(id);
        }
        this.FridgesMenu.selected = id;
      },
      //加载leftMenu数据
      getIndexMenuData() {
        let _this = this;
        getFridgesIndexMenu().then((res) => {
          if (res.data) {
            _this.FridgesMenu = res.data;
            _this.getIndexListData(_this.FridgesMenu.selected);
          } else {
            _this.FridgesMenu = "";
            _this.loadingRemove(); //  使用main中的全局方法关闭loading
            _this.confirm("提示", "菜单加载出错，请尝试刷新或者联系管理员！", "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          }
        }).catch(function (error) {
          _this.FridgesMenu = "";
          _this.loadingRemove(); //  使用main中的全局方法关闭loading
          _this.confirm("提示", error.message, "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
        });
      },
      //右侧list数据
      getIndexListData(param) {
        let _this = this;
        _this.loadingShow = true; //数据加载时的loading
        getFridgesIndexList(param).then((res) => {
          if (res.data) {
            _this.FridgesIndexData = res.data;
          } else {
            _this.confirm("提示", "数据加载出错，请尝试刷新或者联系管理员！", "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          }
          _this.loadingShow = false;
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          _this.loadingShow = false;
        });
      }
    },
    mounted() {
      this.getIndexMenuData();
    },
    activated() {
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  img {
    width: 100%;
  }

  [v-cloak] {
    display: none;
  }
</style>
<style>
  .leftMenuActive {
    background: #fff !important;
  }
</style>
