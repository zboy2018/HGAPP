<style scoped>
.scroll{
  top:47px;
  bottom:54px;
}
</style>

<template>
  <app-layout tarbarIndex="2">
    <x-header slot="header" title="下单" :left-options="{showBack: false}">
      <a slot="right" @click="submit()">提交</a>
    </x-header>
    <div slot="content" >
      <scrolltab class="scroll">
        <scrolltabPanel v-for="category in categoryList" :label="category.Name" :icon="category.Icon" :style="{'color':category.Name=='订单编辑'?'red':'black','font-size':'16px'}">
          <flexbox v-for="item in category.List" :gutter="3" style="padding-bottom:3px;"  >
            <!--<flexbox-item :span="1/5" style="text-align: center"><img :src="(item.PicUrl==''||item.PicUrl==null)?demoPhoto:item.PicUrl" style="width:100%;"></flexbox-item>-->
            <flexbox-item >
              <div style="font-size:14px;" >
                {{item.Name}}
              </div>
              <flexbox :gutter="3" >
                <flexbox-item :span="1/2" style="text-align:left;font-size:10px;">
                  <p style="color:grey" >￥{{item.IsFree?0:item.Price}}元/{{item.Unit}}</p>
                  <p><badge :text="item.Norm" style="background-color:#708090;font-size:9px;height: 14px;line-height: 14px;;"></badge></p>
                </flexbox-item>
                <flexbox-item style="text-align: right">
                  <inline-x-number fillable width="40px" :min="0" button-style="round" v-model="item.Quantity" ></inline-x-number>
                </flexbox-item>
              </flexbox>

            </flexbox-item>

          </flexbox>
        </scrolltabPanel>
      </scrolltab>
    </div>
  </app-layout>
</template>

<script>
  import {Group,Cell,Flexbox,FlexboxItem,InlineXNumber,XNumber,Badge,XHeader  } from 'vux'
  import api from '../api'
  import cookie from '../utils/cookie.js'
  export default {
    components:{Group,Cell,Flexbox,FlexboxItem,InlineXNumber,XNumber,Badge,XHeader },
    data(){
      return {
        categoryList: [],
        demoPhoto:require('../assets/img/logo.png')
      }
    },
    mounted (){
      this.init();
    },
    methods: {
      init(){
        var self = this;
        api.userCanOrder().then(function (res) {
          if (res.errcode != 0) {
            self.$vux.alert.show({title: '提示', content: res.msg,});
            self.$router.push({name: 'my'});
          }
          else {
            var tempList=[];
            var user = JSON.parse(localStorage.getItem("HG-UserInfo"));

            if(sessionStorage.getItem("tempOrderList") != null)
            {
              tempList= JSON.parse(sessionStorage.getItem("tempOrderList")) ;
            }
            var orderId = self.$route.params.orderId;
            if(tempList != null && tempList.length > 0){
              //console.log(tempList[1].sort(function(a,b){return b.Quantity- a.Quantity;}));
              if(orderId!=null && orderId >0){
                self.$vux.loading.show({text: '加载中'});
                api.getProduct({orderId:orderId}).then(function(res){
                  self.$vux.loading.hide();
                  self.categoryList=res.data;
                  api.applog({code:'OrderInit',content:JSON.stringify(res.data),userid:user.Id});
                });
              }
              else {
                self.categoryList=tempList;
                api.applog({code:'OrderInitTemp',content:JSON.stringify(tempList),userid:user.Id});
              }
            }
            else {
              self.$vux.loading.show({text: '加载中'});
              api.getProduct({orderId:orderId}).then(function(res){
                self.$vux.loading.hide();
                self.categoryList=res.data;
                api.applog({code:'OrderInit',content:JSON.stringify(res.data),userid:user.Id});
              });
            }

          }
        });
      },
      submit(){
        var list = [];
        this.categoryList.forEach(function (el) {
          //console.log(el);
          var temp = el.List.filter(function (m) {
            //console.log(m);
            return m.Quantity > 0;
          });
          temp.forEach(function (el) {
            list.push(el);
          });
        });

        if (list.length > 0) {
          window.sessionStorage.setItem("tempOrderList", JSON.stringify(this.categoryList));
          let user = JSON.parse(localStorage.getItem("HG-UserInfo"));
          api.applog({code:'OrderSubmit',content:JSON.stringify(list),userid:user.Id});
          this.$router.push({
            name: 'orderConfirm',
            params: {list: list, newOrder: this.$route.params.newOrder, orderId: this.$route.params.orderId}
          });
        }
        else {
          this.$vux.alert.show({
            title: '提示',
            content: '您未选择任何产品，请选择！',
          });
        }

      }

    },
  }
</script>
