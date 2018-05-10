<template>
  <div class="details" style="height:100%;">
    <!-- 加载组件 -->
    <b-scroll class="wrapper" style="height:calc(100% - 42px);" ref="scroll">
      <div class="content">
        <div v-for="(item, index) in items" :key="index">
          <box gap="20px 10px" v-if="item.component == 'x-button'">
            <component :is="item.component" :text="item.text"
                       :type="item.type" :gradients="item.bgColor" @click.native="form_data"
                       :disabled="item.disabled"></component>
          </box>
          <group v-else-if="item.type=='cell'">
            <cell :title="item.title" primary="content" :inline-desc="'当前: ' + item.model">
              <component :is="item.component" :title="item.title" :text="item.text" :placeholder="item.placeholder"
                         v-model="item.model" :height="item.height" :max="item.max" :min="item.min"
                         :options="item.list" :step="item.step"></component>
            </cell>
          </group>

          <group v-else-if="item.type=='checker'">
            <cell :title="item.title" primary="content">
              <div style="margin-left:10px;text-align:left;">
                <checker
                  v-model="item.model"
                  :type="item.checker_type"
                  default-item-class="demo5-item"
                  selected-item-class="demo5-item-selected">
                  <checker-item v-for="(data, index) in item.list" :key="index" :value="data.id">{{data.label}}
                  </checker-item>
                </checker>
              </div>
            </cell>
          </group>

          <group v-else>
            <component :is="item.component" :title="item.title" :text="item.text" :placeholder="item.placeholder"
                       v-model="item.model" :height="item.height" :max="item.max" :min="item.min"
                       :options="item.list" :start-date="item.star_time" :end-date="item.end_time" :format="item.format"
                       :disable-future="item.disable_future" :fillable="item.fillable" :readonly="item.readonly"
                       :disabled="item.disabled"></component>
          </group>
        </div>
      </div>
    </b-scroll>
    <!-- 底部button -->
    <flexbox :gutter="0">
      <flexbox-item>
        <x-button @click.native="reset">重置</x-button>
      </flexbox-item>
      <flexbox-item>
        <x-button :gradients="['#409eff', '#409eff']" @click.native="submit">确定</x-button>
      </flexbox-item>
    </flexbox>
  </div>
</template>

<script type="es6">
  export default {
    data() {
      return {
        show1: false,
        header_title: "", //头部导航的title
        items: []
      }
    },
    methods: {
      //数据加载
      loadComponent() {
        this.items = [{
          component: 'x-input',
          title: "冰箱名称：",
          placeholder: "请输入冰箱名称",
          model: "",
          disabled: false
        }, {
          component: 'x-switch',
          title: "报警开关：",
          placeholder: "请输入XXX",
          model: "",
          disabled: false
        }, {
          component: 'calendar',
          title: "出厂日期：",
          placeholder: "请选择冰箱出厂日期",
          disable_future: true, //是否禁止选择今天之后的日期
          model: "",
          readonly: false
        }, {
          component: 'x-input',
          title: "冰箱编号：",
          placeholder: "请输入冰箱编号",
          model: "",
          disabled: false
        }, {
          component: 'x-textarea',
          title: "其他：",
          placeholder: "请输入其他",
          max: 200,
          height: 100,
          model: "",
          disabled: false
        }, {
          component: 'selector',
          title: "下拉窗：",
          placeholder: "请选择",
          list: [{key: '0', value: '请选择'}, {key: 'sh', value: '上海'}, {key: 'gd', value: '广东'}, {
            key: 'gx',
            value: '广西'
          }],
          model: "0",
          readonly: false
        }, {
          component: 'x-number',
          title: "数量：",
          min: 0,
          max: 3,
          fillable: true, //是否可以输入
          model: 0
        }, {
          component: 'range',
          title: "延时分钟：",
          type: "cell", //判断是否在cell里面加载的组件
          step: 1,
          min: 0,
          max: 100,
          model: 0
        }, {
          component: 'datetime-range',
          title: "选择日期到分钟：",
          star_time: "2018-01-01",
          end_time: "2018-05-09",
          format: "YYYY年MM月DD日",
          model: ['2018-05-07', '11', '05']
        }, {
          component: 'datetime-range',
          type: 'checker',
          title: "选择XXX：",
          checker_type: "checkbox",
          list: [
            {id: "1", label: "冰箱1"},
            {id: "2", label: "冰箱2"},
            {id: "3", label: "冰箱3"},
          ],
          model: []
        }, {
          component: 'x-button',
          text: "保存",
          type: "primary",
          bgColor: ['#1D62F0', '#19D5FD'],
          disabled: false,  //如果按钮要选择禁用，不要传颜色字段
        }]
      },
      //取值
      form_data() {
        for (let i = 0; i < this.items.length; i++) {
          if (this.items[i].model) {
            console.log(this.items[i].title + ":" + this.items[i].model);
          }
        }
      },
      //确认
      submit() {
        this.$emit('reset'); //  调用父组件的方法
        this.show1 = false;
      }
    },
    mounted() {
      this.loadComponent();
    },
    activated() {
      this.$refs.scroll.scrollTo(0, 0, 0, "");
      this.header_title = sessionStorage.getItem('result_header');
      this.loadingRemove(); //  使用main中的全局方法关闭loading
    }
  }
</script>

<style scoped lang="less">
  .demo5-item {
    padding: 5px 10px;
    height: 26px;
    line-height: 26px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
    margin: 5px 6px 5px 0;
  }

  .demo5-item-selected {
    background: #ffffff url(../../assets/checker-active.png) no-repeat right bottom;
    border-color: #ff4a00;
  }
</style>
