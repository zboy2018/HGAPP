<template>
  <app-layout :showTabbar="false">
    <x-header slot="header" title="恢复营业">
      <a slot="right" @click="submit()">提交</a>
    </x-header>
    <div slot="content">
      <section>
        <group  >
          <x-switch title="是否恢复营业" v-model="resume"></x-switch>
        </group>
      </section>
    </div>
  </app-layout>
</template>

<script>
  import {Group,Cell,XSwitch ,XHeader,XButton } from 'vux'
  import api from '../../api'
  export default {
    components:{Group,Cell,XSwitch,XHeader,XButton },
    data(){
      return{
        resume:false
      }
    },
    methods: {
      submit(){
        if(!this.resume)
        {
          this.$vux.alert.show({title: '提示', content: '您未点击恢复营业，请选择！'});
          return;
        }
        var self = this;
        api.userResume().then(function (res) {
          if (res.errcode == 0) {
            self.$vux.alert.show({title: '成功', content: '提交成功！'});
            self.$router.push({name: 'my'});
          }
          else {
            self.$vux.alert.show({title: '提示', content: res.msg});
          }

        });
      }
    }
  }
</script>

<style scoped>

</style>
