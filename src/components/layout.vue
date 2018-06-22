<template>
  <section >
    <header>
      <slot name="header">
        <x-header v-if="showNavbar" :left-options="{showBack: showBack}" :title="title"></x-header>
      </slot>
    </header>
    <section class="content" ref="content">
      <slot name="content">

      </slot>

    </section>
    <footer>
      <tabbar v-if="showTabbar">
        <tabbar-item link="/main" :selected="tarbarIndex=='1'">
          <i slot="icon" class="icon icon-home"></i>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item link="/order" :selected="tarbarIndex=='2'">
          <i slot="icon" class="icon icon-cart"></i>
          <span slot="label">下单</span>
        </tabbar-item>
        <tabbar-item link="/order/history" :selected="tarbarIndex=='3'">
          <i slot="icon" class="icon icon-order-history"></i>
          <span slot="label">订单</span>
        </tabbar-item>
        <tabbar-item link="/my" :selected="tarbarIndex=='4'">
          <i slot="icon" class="icon icon-user"></i>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </footer>
    <toast type="text" is-show-mask text="Hello World" >12212</toast>
  </section>
</template>

<script type="text/babel">
  import {Tabbar, TabbarItem,XHeader,XTable,Toast} from 'vux'
  import '../assets/css/icon.css'
  export default {
    props: {
      title: String,
      tarbarIndex:String,
      showNavbar: {
        type: Boolean,
        default: true
      },
      showTabbar:{
        type: Boolean,
        default: true
      },
      showBack:{
        type: Boolean,
        default: true
      }
    },
    components:{Tabbar,TabbarItem,XHeader,XTable,Toast},
    data() {
      return {
      }
    },
    computed: {

    },
    mounted (){
      this.init();
      //this.$vux.toast.text('hello', 'top');
    },
    methods: {
      init() {
        this.$refs.content.style.height = document.documentElement.clientHeight + 'px';

      },

    }
  }
</script>

<style lang="less">
.content{
  overflow-y:scroll;padding-top:46px;padding-bottom:55px;
}
.content-background{
  background-color:#FAFAFA;
}
  header{
    width:100%;position:absolute;top:0;left:0;z-index:100
  }
</style>
