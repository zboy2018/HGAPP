<template>
  <app-layout title="首页" tarbarIndex="1" :showBack="false">
    <div slot="content" >
      <toast v-model="showToast" type="text" :time="3000" width="90%" :is-show-mask="showmask" :text="suggestion" position="bottom"></toast>
      <section>
        <blur :blur-amount=50 :url="backurl" :height=100>
          <p class="center" style="padding-top:5px;">
            <img :src="url" style="height:40px">
          </p>
          <p class="center" style="color:black;padding-top:0;font-size:15px;">{{userInfo.CompanyName}}<br/><a :href="'tel:'+userInfo.CompanyTel" style="font-size:12px;color:grey">{{userInfo.CompanyTel}}</a></p>
        </blur>
      </section>
      <section  class="content-background">
        <divider><b>公告</b></divider>
            <Marquee  :interval="5000">
              <MarqueeItem v-for="item in notices" style="padding: 0 10px;color:#FF7256;">
                <div style="height:200px">{{item.Title}}</div>
              </MarqueeItem>
            </Marquee>
        <divider><b>促销</b></divider>

        <group>
          <cell v-for="item in sales" >
            <p slot="inline-desc" :style="{color:highLightColors[item.level]}">{{item.Title}}</p>
          </cell>
        </group>

      </section>
    </div>

  </app-layout>
</template>

<script>
  import {Group, Cell,Flexbox, FlexboxItem, Blur,Marquee, MarqueeItem,Divider,Toast ,XButton,Popover,Panel  } from 'vux'
  import api from '../api'
  import cookie from '../utils/cookie.js'
  var flag = false;
  export default {
    components:{Group, Cell,Flexbox, FlexboxItem, Blur,Marquee, MarqueeItem,Divider,Toast,XButton,Popover,Panel   },
    data(){
      return {
        showToast:false,
        highLightColors:["#666","#3A5FCD","#CDCD00"],
        backurl:'http://app.zaoyangfood.com:8001/static/img/logo-bkl.png',
        url: '',
        userInfo:{},
        notices:[],
        sales:[],
        suggestion:"",
        showmask:true
      }
    },
    mounted (){
      this.init();
    },
    methods: {
      init(){
        var self = this;
        let user = JSON.parse(localStorage.getItem("HG-UserInfo"));
        self.userInfo= user;
        self.url = user.LogoUrl;
        if (!flag) {
          api.getUserTodayOrderAmount().then(function (res) {
            if(res.data>0){
              self.suggestion = '您有一笔欠款'+res.data+'元！';
              self.showToast = true;
              flag = true;
            }
            else{
              self.showToast = false;
              flag = true;
            }
          });

        }
        else {
          self.showToast = false;
        }

        api.getNotice().then(function (res) {
          //console.log(res.data);
          if (res.errcode != 0) {
            self.$vux.alert.show({title: '提示', content: res.msg,});
            self.$router.push({name: 'my'});
          }
          else {
            var notices = res.data.filter(function (item) {
              return item.Type == 1
            });
            var sales = res.data.filter(function (item) {
              return item.Type == 2
            });
            self.notices = notices;
            self.sales = sales;
          }
        });
      },

    },
  }
</script>

<style scoped>
  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
  }
  .center img {
    width: auto;
    height: 80px;
    border: 4px solid #ececec;
  }
</style>
