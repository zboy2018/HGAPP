<template>
  <app-layout :showTabbar="false">
    <x-header slot="header" title="停业申请">
      <a slot="right" @click="submit()">提交</a>
    </x-header>
    <div slot="content" class="content-background">
      <section>

        <group title="暂停营业时间">
          <datetime v-model="startDate" title="起始日期"></datetime>
          <datetime v-model="endDate" title="终止日期"></datetime>
        </group>
      </section>
    </div>
  </app-layout>
</template>

<script>
  import {Group,Cell,Divider,Datetime,XHeader,XButton } from 'vux'
  import api from '../../api'
  export default {
    components:{Group,Cell,Divider,Datetime,XHeader,XButton },
    data(){
      return{
        startDate:"",
        endDate:""
      }
    },
    methods: {
      submit(){
        if (this.startDate == "") {
          this.$vux.alert.show({title: '提示', content: '请选择暂停起始日期！'});
          return;
        }
        if (this.endDate == "") {
          this.$vux.alert.show({title: '提示', content: '请选择暂停终止日期！'});
          return;
        }
        if (this.startDate > this.endDate) {
          this.$vux.alert.show({title: '提示', content: '起始日期不得大于终止日期！'});
          return;
        }
        var self = this;
        api.userRest({from: this.startDate, to: this.endDate}).then(function (res) {
          if (res.errcode == 0) {
            self.$vux.alert.show({title: '成功', content: '提交成功！'});
            self.$router.push({name: 'my'});
          }
          else {
            self.$vux.alert.show({title: '提示', content: res.msg});
          }

        });

      },
    }
  }
</script>

<style scoped>

</style>
