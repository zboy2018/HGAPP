<template>
  <app-layout :showTabbar="false">
    <x-header slot="header" title="修改密码">
      <a slot="right" @click="submit()">提交</a>
    </x-header>
    <div slot="content">
      <section>
        <group  >
          <x-input required type="password" placeholder="请输旧密码" :min="6" v-model="oldPassword"></x-input>
          <x-input required type="password" placeholder="请输入新密码" :min="6" v-model="newPassword"></x-input>
          <x-input required type="password" placeholder="请再次输入新密码" :min="6" v-model="confirmPassword"></x-input>
        </group>
      </section>
    </div>
  </app-layout>
</template>

<script>
  import {Group,XInput,XHeader,XButton } from 'vux'
  import api from '../../api'
  export default {
    components:{Group,XInput,XHeader,XButton },
    data(){
      return{
        oldPassword:'',
        newPassword:'',
        confirmPassword:''
      }
    },
    methods: {
      submit(){
        var self = this;
        if(!this.oldPassword || this.oldPassword.length<6){
          self.$vux.alert.show({title: '提示', content: '请输入合法旧密码!'});
          return;
        }
        if(!this.newPassword || this.newPassword.length<6){
          self.$vux.alert.show({title: '提示', content: '请输入合法新密码'});
          return;
        }
        if(this.newPassword!= this.confirmPassword){
          self.$vux.alert.show({title: '提示', content: '两次输入密码不一致，请确认'});
          return;
        }
        api.userModifyPwd({oldPassword :self.oldPassword,newPassword:self.newPassword}).then(function (res) {
          if (res.errcode == 0) {
            self.$vux.alert.show({title: '成功', content: '修改成功！'});
            self.$router.push({name: 'my'});
          }
          else {
            self.$vux.alert.show({title: '错误', content: res.msg});
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
