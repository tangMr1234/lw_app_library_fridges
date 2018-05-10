<template>
  <div class="details" style="height:100%;">
    <!-- 头部 -->
    <x-header :title="this.$route.name"></x-header>
    <!-- 主体 -->
    <b-scroll class="wrapper" style="height:calc(100% - 46px);">
      <div class="content">
        <card>
          <!-- 标题及来源 -->
          <div slot="header" style="margin-top:30px;margin-left:15px;">
            <div style="font-size:22px;">{{detail_Data.title}}</div>
            <div style="color:#999;">
              {{detail_Data.date}} &nbsp&nbsp&nbsp&nbsp<a href="index"
                                                          style="color:#607fa6">{{detail_Data.small_title}}</a>
            </div>
          </div>
          <!-- 文章 -->
          <div slot="content" class="card-padding" style="margin-top:10px;">
            <div class="fridges_new">
              <img :src="detail_Data.src" width="100%" style="margin-bottom:10px;" alt="">
              <div v-html="detail_Data.content"></div>
            </div>
            <br>
            <divider>{{detail_Data.slogan}}</divider>
            <br>
            <!-- 文章来源等信息 -->
            <div style="text-align:center;">
              <img :src="detail_Data.qrcode" width="150" alt="">
            </div>
            <!-- 文章换篇 -->
            <flexbox>
              <flexbox-item>
                <div class="text-ellipsis" style="display:block;color:#409eff;">
                  <span>上一篇：</span><span>{{detail_Data.prev.title}}</span>
                </div>
              </flexbox-item>
              <flexbox-item :span="1/6">
                <div
                  style="border-radius:100%;background:#eee;width:50px;height:50px;line-height:50px;text-align:center;margin:30px auto">
                  完
                </div>
              </flexbox-item>
              <flexbox-item>
                <div class="text-ellipsis" style="display:block;color:#409eff;text-align:right;">
                  <span>下一篇：</span><span>{{detail_Data.next.title}}</span>
                </div>
              </flexbox-item>
            </flexbox>
          </div>
        </card>
      </div>
    </b-scroll>
  </div>
</template>

<script type="es6">
  import {getManuDetailData} from '@/api/api';

  export default {
    data() {
      return {
        detail_Data: {
          title: "科普小课堂| 卡介苗",
          date: "2018-09-01 12:10",
          small_title: "来源：上海冷王",
          src: "//img95.699pic.com/photo/40010/1179.jpg_wh860.jpg",
          content: " <p>\n" +
          "                卡介苗是宝宝出生后接种的第一个疫苗。今天冷王科技疫苗科普小课堂跟您分享一些关于卡介苗的相关知识。要认真听讲哟！\n" +
          "              </p>\n" +
          "              <p>\n" +
          "                卡介苗，中文名称来自于其发明者（卡氏-介氏）是用于预防结核病的疫苗，使用活的无毒牛型结核杆菌(Mycobacterium\n" +
          "                bovis)制成。接种人体后通过引起轻微感染而产生对人型结核杆菌的免疫力。90%以上的受种者会在接种局部形成溃疡持续数周至半年，最后愈合形成疤痕，俗称卡疤。经过100年的接种历史，证实卡介苗是安全的疫苗之一。\n" +
          "              </p>\n" +
          "              <img\n" +
          "                src=\"//img95.699pic.com/photo/40012/8566.jpg_wh860.jpg\"\n" +
          "                alt=\"\" style=\"margin:10px 0;\" width=\"100%\">\n" +
          "              <p>\n" +
          "                在结核感染发病率低的国家，卡介苗不是儿童必须接种的疫苗，必要时才使用，这就给国内的一些家长造成了认知误区，认为卡介苗没有接种必要性。家长忽视了一个大前提——结核发病感染率。在中国，结核病的发病率仍然较高。2015年，我国估计新发结核病91.8万例，发病率为67/10万，其中男性62.2万例(67.8%)，女性29.6万例(32.2%)，死亡(不含人免疫缺陷病毒检测阳性)3.5万例，结核仍然威胁着国人的健康。所以国内还是需要接种的。中国儿童疫苗接种规定中明确规定新生儿出生后需要接种卡介苗。\n" +
          "              </p>\n" +
          "              <img\n" +
          "                src=\"//img95.699pic.com/photo/10033/3150.jpg_wh860.jpg\"\n" +
          "                alt=\"\" style=\"margin:10px 0;\" width=\"100%\">\n" +
          "              <p>\n" +
          "                1、早产、难产的宝宝不可以接种卡介苗。\n" +
          "                2、具有发热、呕吐腹泻等急性传染病的宝宝不可以接种。\n" +
          "                3、有疑是患结核病的宝宝应该先做结核菌素测验，判断是否患结核病。\n" +
          "                4、新生婴幼儿体重低于2500公克的不可以接种卡介苗。\n" +
          "                5、对接种疫苗有过敏反应的或者具有某些慢性疾病、皮肤病、神经系统性疾病的应该与医生沟通，再选择是否接种卡介苗。\n" +
          "              </p>",
          slogan: "感知温度 守护健康",
          qrcode: "//dev4.coldyun.com/mobile/static/img/coldchain56.369337c.png",
          prev: {
            title: "这篇文章很赞",
            id: "1"
          },
          next: {
            title: "关于冰箱的多少个",
            id: "3"
          }
        }, //页面数据
      }
    },
    methods: {
      getDetailData() {
        let _this = this;
        return;
        getManuDetailData(this.$route.query.routeParams).then((res) => {
          if (res.data) {
            _this.detail_Data = res.data;
          } else {
            _this.confirm("提示", "数据加载出错，请尝试刷新或者联系管理员！", "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          }
          _this.loadingRemove(); //  使用MAIN中的全局方法关闭LOADING
        }).catch(function (error) {
          _this.confirm("提示", error.message, "刷新试试", _this.reload); //使用main中的全局方法调用弹窗
          _this.loadingRemove();  // 使用MAIN中的全局方法关闭LOADING
        });
      }
    },
    mounted() {
      this.loadingRemove();  // 使用MAIN中的全局方法关闭LOADING
      this.getDetailData();
    }
  }
</script>

<style scoped lang="less">
  .card-padding {
    padding: 15px;
  }
</style>
