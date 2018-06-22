<template>
  <app-layout tarbarIndex="4" >
    <x-header slot="header" title="我的" :left-options="{showBack: false}">
      <a slot="right" @click="refresh()">刷新</a>
    </x-header>
    <div slot="content">
      <section>
        <blur :blur-amount=40 :url="url" :height=120>
          <flexbox>
            <flexbox-item class="left" :span="4"><img :src="url" ></flexbox-item>
            <flexbox-item class="right">
              <p style="font-size:15px">{{userInfo.Name}}</p>
              <p style="font-size:12px">移动电话：<a :href="'tel:'+userInfo.Mobile" style="font-size:12px;color:grey">{{userInfo.Mobile}}</a></p>
            </flexbox-item>
          </flexbox>
        </blur>
      </section>
    <section class="content-background">
      <card :header="{title:'我的资产'}">
        <div slot="content" class="card-flex card-content01" >
          <div>
            <i class="icon icon-baozhengjin"></i>
            <p>
              实际欠款
              <span >￥{{getArrearage}}</span>
            </p>
          </div>
        </div>
      </card>
      <group>
        <cell title="停业申请" v-if="showSuspend"  link="/my/suspend"></cell>
        <cell title="恢复营业" v-if="showResume" link="/my/resume">
          <span style="font-size: 12px;">{{suspendDate}}</span>
        </cell>
        <cell title="对账单" link="/my/bill"></cell>
        <cell title="修改密码" link="/my/modifyPwd"></cell>
      </group>
      <group style="padding:10px;">
        <x-button  type="default"  @click.native="logoutConfirm">退出</x-button>
      </group>
      <actionsheet v-model="showMenus" :menus="menus" @on-click-menu-logout="logout" show-cancel></actionsheet>
    </section>
    </div>
  </app-layout>
</template>

<script>
  import {Group,Cell,XButton,Blur,Flexbox,FlexboxItem,Card,Actionsheet,XHeader,Toast   } from 'vux'
  import cookie from '../utils/cookie.js'
  import api from '../api'

  export default {
    components:{Group,Cell,XButton,Blur,Flexbox,FlexboxItem,Card,Actionsheet,XHeader,Toast   },
    data(){
      return{
        showMenus:false,
        menus:{'title.noop':'<span style="color:#666;font-size:14px;">是否要退出？</span>',logout:"确定"},
        userInfo:{},
        showSuspend:false,
        showResume:false,
        url:"http://app.zaoyangfood.com:8001/static/img/user.jpg",
        suspendDate:"",
        userArrearage:0
      }
    },
    mounted (){
      this.init();
    },
    computed: {
      getArrearage(){
        return (this.userArrearage).toFixed(2);
      }
    },
    methods: {
      init(){
        let user = JSON.parse(localStorage.getItem("HG-UserInfo"));
        console.log(user.overdue);
        this.userInfo = user;
        var self = this;
        api.getUserRest().then(function (res) {
          if (res.errcode == 10001) {
            self.$vux.alert.show({title: '提示', content: res.msg, onHide () {
              self.logout();
            }});
          }
          else if(res.errcode != 0){
            self.$vux.alert.show({title: '提示', content: res.msg});
          }
          else {
            if (res.data) {
              console.log(res.data);
              self.suspendDate = res.data.RestFrom.substring(0, 10) + "~" + res.data.RestTo.substring(0, 10);
              self.showResume = true;
              self.showSuspend = false;
            }
            else if (self.userInfo.IsOpen) {
              self.showResume = false;
              self.showSuspend = true;
            }
            else {
              self.showResume = false;
              self.showSuspend = false;
            }
          }
        });
        api.getUserTodayOrderAmount().then(function (res) {
          if(res.errcode == 0)
            self.userArrearage = res.data;
        });

        if(new Date()>new Date(user.overdue)){
          console.log('用户信息过期，自动刷新');
          this.refresh();
        }
      },
      logoutConfirm(){
        this.showMenus = true;
      },
      logout(){
        cookie.clear("HG-UserId");
        cookie.clear("HG-UserPassword");
        localStorage.removeItem("HG-UserInfo");
        sessionStorage.removeItem("tempOrderList");
        this.$router.push({name: 'login'});
      },
      refresh(){
        let userId = cookie.get("HG-UserId");
        let self = this;
        api.getUser({id: userId}).then(function (res) {
          if (res.errcode == 0) {
            res.data.overdue =new Date( new Date().setDate(new Date().getDate()+1));
            localStorage.setItem("HG-UserInfo", JSON.stringify(res.data));
            self.init();
            self.$vux.toast.text('刷新成功', 'middle');
          }
          else if(res.errcode==10001) {
            self.$vux.alert.show({title: '提示', content: res.msg, onHide () {
              self.logout();
            }});
          }
        });

      }
    }
  }
</script>

<style scoped>
  .left {
    text-align: left;
    padding: 1rem;
    color: #fff;
  }
  .left img {
    width: 90px;;
    height:90px;;
    border-radius: 50%;
    border: 4px solid #ececec;
  }
  .right{
    text-align: right;
    padding: 1rem;
    font-size:1.2rem;
  }

  .card-flex {
    display: flex;
    z-index:1;
  }
  .card-content01 {
    padding: 10px 0;
  }
  .card-flex span {
    color: #f74c31;
  }
  .card-flex i{
    font-size:2rem;
    color:#00A000;
  }
  .card-flex > div {
    flex: 1;
    text-align: center;
    font-size: 12px;
  }
</style>
