<template>
  <div style="width:100%;height: 100%;overflow: hidden;">
    <x-header slot="header" :title="this.$route.name">
      <a slot="right" style="color:#fff;" @click="show">
        <i class="iconfont icon-sousuo" style="font-size:20px;"></i>
        <small style="vertical-align: top;">筛选</small>
      </a>
    </x-header>
    <!-- 数据展示列表 -->
    <b-scroll class="wrapper" style="height: calc(100% - 96px);">
      <div class="content">
        <group :gutter="0">
          <cell v-for="(data, index) in ManuData.list" :key="index" @click.native="showPopupComment(data.id)"
                style="padding:20px 0;">
            <img slot="icon" :src="data.src" width="100" style="margin:0 20px;" alt="">
            <div slot="title" style="font-size:20px;">{{data.title}}</div>
            <div slot="inline-desc">{{data.desc}}</div>
          </cell>
        </group>
      </div>
    </b-scroll>
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
  import SFilter from '@/views/Popup/Filter.vue'
  import {getManufacturerData} from '@/api/api';

  export default {
    components: {SFilter},
    data() {
      return {
        component: "", //加载组件
        popupWidth: '87%', //弹出层的宽度设置
        popup_show: false, //筛选弹出窗
        ManuData: [], //列表数据
      }
    },
    methods: {
      //打开详情
      showPopupComment(id) {
        this.$router.push({
          path: 'mf_detail',
          query: {
            routeParams: id
          }
        });
      },
      //打开详情时调用子组件的方法
      show() {
        this.component = "s-filter";
        this.popup_show = true;
      },
      //弹出的子组件filter调用的父组件index的方法
      submitLoad() {
        this.popup_show = false;
        this.getManufacturer();
      },
      //加载数据
      getManufacturer() {
        let _this = this;
        getManufacturerData("").then((res) => {
          if (res.data) {
            _this.ManuData = res.data;
          } else {
            _this.confirm("提示", "菜单加载出错，请尝试刷新或者联系管理员！", "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          }
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
        });
      }
    },
    mounted() {
      this.getManufacturer();
    },
    activated() {
      this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
    }
  }
</script>
