<template>
  <div style="background: #fff;height:100%;">
    <x-header slot="header" :title="this.$route.name"></x-header>
    <b-scroll class="wrapper" style="height: calc(100% - 46px);" ref="scroll">
      <div class="content" v-if="CommentData&&CommentData!=''">
        <!-- 顶部图文标题 -->
        <flexbox style="padding:20px 0;">
          <flexbox-item :span="2/5"><img :src="CommentData.logo" alt="" style="width:100%;"></flexbox-item>
          <flexbox-item>
            <h2 style="font-size:22px;">{{CommentData.label}}</h2>
            <div>{{CommentData.desc}}</div>
            <div>{{CommentData.other}}</div>
          </flexbox-item>
        </flexbox>
        <!-- 轮播软件截图 -->
        <div v-if="CommentData.swiperImg">
          <div style="margin-top:10px;">
            <swiper :options="swiperOptionBanner" ref="mySwiper">
              <!-- slides -->
              <swiper-slide v-for="(data, index) in CommentData.swiperImg" :key="index">
                <img :src="data.msrc" width="100%" style="display:block;" @click="show(index)"
                     class="previewer-demo-img">
              </swiper-slide>
            </swiper>
          </div>
          <!-- 弹出大图轮播 -->
          <div v-transfer-dom>
            <previewer :list="CommentData.swiperImg" ref="previewer" :options="options"
                       @on-index-change="logIndexChange"></previewer>
          </div>
        </div>
        <!-- 应用介绍 -->
        <card v-if="CommentData.content">
          <div slot="content" class="card-padding">
            <p v-html="CommentData.content"></p>
          </div>
        </card>
        <!-- 评价信息 -->
        <card v-if="CommentData.fridge_other" style="background: #eee;margin:10px;border-radius:5px;">
          <div slot="header">
            <cell>
              <b slot="title" style="font-size:20px;">{{CommentData.fridge_other.label}}</b>
              <div slot="default">{{CommentData.fridge_other.date}}</div>
            </cell>
          </div>
          <div slot="content" style="padding:0 15px 15px;">
            {{CommentData.fridge_other.content}}
          </div>
        </card>
        <!-- 滚动栏目 -->
        <div v-if="CommentData.tab">
          <tab>
            <tab-item v-for="(item, index) in CommentData.tab.tabs" :key="index" @on-item-click="tabChange"
                      :selected="(index===0)?true:false">{{item.label}}
            </tab-item>
          </tab>
          <swiper :options="swiperOptionTab" ref="mySwiperTab">
            <!-- slides -->
            <swiper-slide v-for="(data, index) in CommentData.tab.tabs_content" :key="index">
              <card>
                <div slot="header">
                  <cell>
                    <div slot="default">
                      {{data.date}}
                    </div>
                  </cell>
                </div>
                <div slot="content" style="padding:0 15px 15px;">
                  {{data.content}}
                </div>
              </card>
            </swiper-slide>
          </swiper>
        </div>
        <!-- 信息 -->
        <card v-if="CommentData.information" style="margin-bottom:30px;">
          <div slot="header" style="font-size:24px;margin:0 20px;">
            {{CommentData.information.label}}
          </div>
          <div slot="content" class="card-padding" style="background: #eee;margin:0 15px;border-radius:5px;">
            {{CommentData.information.content}}
          </div>
        </card>
      </div>
    </b-scroll>
  </div>
</template>

<script type="es6">
  import 'swiper/dist/css/swiper.css'
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import {getFridgesContent} from '@/api/api';

  export default {
    components: {
      swiper, swiperSlide
    },
    data() {
      return {
        CommentData: {}, //数据
        options: {
          getThumbBoundsFn(index) {
            let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }, //打开大图的初始化配置
        //轮播初始化,使用swiper4插件,具体Api可查看手册
        swiperOptionBanner: {
          watchOverflow: true,//因为仅有1个slide，swiper无效
          spaceBetween: 20,
          slidesPerView: 1.2,
          slidesOffsetBefore: 20,
          slidesOffsetAfter: 20,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
        },
        //tab轮播初始化
        swiperOptionTab: {
          autoplay: false,
          slidesPerView: 1,
          allowTouchMove: false, //禁止滑动、滚动
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
        }
      }
    },
    //获取swiper对其进行操作
    computed: {
      swiper() {
        return this.$refs.mySwiperTab.swiper
      }
    },
    methods: {
      //tab切换
      tabChange(index) {
        this.swiper.slideTo(index, 300, false);
      },
      show(index) {
        this.$refs.previewer.show(index)
      },
      logIndexChange(arg) {

      },
      //  通过postMessage调用iframe父组件的方法
      goBack() {
        let link = window.location.href.split("#");
        window.parent.postMessage('CloseLwYmdanan', link[0]);
      },
      //设置弹出层每次加载数据时滚动条滚动至顶部
      scrollTo() {
        this.$refs.scroll.scrollTo(0, 0, 0, "");
      },
      //获取数据
      getContentData() {
        this.scrollTo();
        let _this = this;
        getFridgesContent(this.$utils.getUrlKey("id")).then((res) => {
          if (res.data) {
            _this.CommentData = res.data;
          } else {
            _this.confirm("提示", "数据加载出错，请尝试刷新或者联系管理员！", "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          }
          _this.loadingShow = false;
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          _this.loadingShow = false;
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        });
      }
    },
    mounted() {
      this.getContentData();
    }
  }
</script>

<style scoped rel="stylesheet/less" lang="less">
  .card-padding {
    padding: 15px;
  }
</style>
<style>
  .ximg-demo {
    width: 100%;
    height: auto;
  }

  .ximg-error {
    background-color: yellow;
  }

  .ximg-error:after {
    content: '加载失败';
    color: red;
  }
</style>
