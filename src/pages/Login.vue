<template>
    <div  class="login-content" >
        <div class="logo">
          <img :src="logoUrl" alt="logo" width="250" ></img>
        </div>
      <group>
        <x-input required type="text" placeholder="请输入用户名" :min="4" v-model="username"></x-input>
        <x-input  type="password" placeholder="请输入密码" :min="6" v-model="password"></x-input>
        <x-switch title="记住用户名密码" v-model="isRememberUser"></x-switch>
      </group>
      <group  class="operation">
        <x-button type="primary"  @click.native="login">登录</x-button>
      </group>
      <divider style="position:absolute;bottom:0px;font-size:10px;"><span class="ad">上海携恒提供技术支持</span></divider>
  </div>
</template>

<script>
  import {XInput, Group, XButton, Cell,XSwitch,Divider } from 'vux'
  import api from '../api'
  import cookie from '../utils/cookie.js'
  export default {
    components:{XInput, Group, XButton, Cell,XSwitch,Divider },
    data(){
      return {
        logoUrl: require('../assets/img/logo.png'),
        username:"",
        password:"",
        isRememberUser:false,
      }
    },
    mounted (){
      this.init();

    },
    methods: {
      init(){
        cookie.clear("HG-UserId");
        cookie.clear("HG-UserPassword");
        localStorage.removeItem("HG-UserInfo");
        sessionStorage.removeItem("tempOrderList");
        var userLoginInfo = JSON.parse(localStorage.getItem("HG-UserLoginInfo"));
        if(userLoginInfo!=null) {
          this.username = userLoginInfo.username;
          this.password = userLoginInfo.password;
          this.isRememberUser = true;
        }
      },
      login(){
        var self = this;
        var username= self.username;
        if(self.username.length<4)
          self.$vux.alert.show({title: '提示', content:'您输入的用户名不合法！'});
        if(self.password.length<6)
          self.$vux.alert.show({title: '提示', content:'密码至少6位，请重新输入！'});
        self.$vux.loading.show({text: '登录中'});
        api.userLogin({username:this.username,password:this.password}).then(function(res){
          self.$vux.loading.hide();
          if(res.errcode==0){
            cookie.set("HG-UserId", res.data.Id, 999999);
            cookie.set("HG-UserPassword", res.data.Password, 999999);
            res.data.overdue =new Date( new Date().setDate(new Date().getDate()+1));
            localStorage.setItem("HG-UserInfo", JSON.stringify(res.data));
            if(self.isRememberUser)
            {
              localStorage.setItem("HG-UserLoginInfo", JSON.stringify({username:self.username,password:self.password}));
            }
            else {
              localStorage.removeItem("HG-UserLoginInfo");
            }


            //window.localStorage.setItem("HG-UserId",res.data);
            self.$router.push({name: 'main'});
          }
          else {
            self.$vux.alert.show({title: '失败', content:res.msg});
            self.username=username;
          }
        });
      },
    },
  }
</script>

<style scoped>
.logo{
  text-align: center;
}
  .operation
  {
padding:0 10px;
  }
  .login-content{
    background-color: #FDF5E6;
    height:100%;
    padding-top:100px;
  }

  .ad:before{
    content:'COOPWIN';
    color:#6495ED;
    background-color: white;
    font-weight: bolder;
    font-size:15px;
    padding:2px;
    font-family:"Times New Roman",Georgia,Serif;
  }



</style>
