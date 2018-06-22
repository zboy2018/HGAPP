<template>
  <app-layout title="对账单" :showTabbar="false">
    <div slot="content" class="content-background">
      <section>
        <h3 style="text-align: center;color:gray;margin: 10px;;" v-if="bills.length==0">{{title}}</h3>
        <group>
            <cell v-for="item in bills" :title="item.BillName" is-link @click.native="detail(item.Id,item.Arrearage,item.Amount)" ></cell>
            <!--<template v-if="item.showDetail">-->
              <!--<cell-form-preview :border-intent="false" :list="item.details"></cell-form-preview>-->
              <!--<section style="padding:0 10px;"><x-button type="primary"  plain link="/my/bill/detail">单品明细</x-button></section>-->
            <!--</template>-->
        </group>
      </section>
    </div>
  </app-layout>
</template>

<script>
  import {Group,Cell,CellFormPreview,XButton } from 'vux'
  import api from '../../api'

  export default {
    components: {Group, Cell, CellFormPreview, XButton},
    data(){
      return {
        bills: [],
        title:""
      }
    },
    mounted (){
      this.init();
    },
    methods: {
      init(){
        var self= this;
        self.title='加载中...';
        api.getUserBill().then(function (res) {
          if(res.errcode==0) {
            console.log(res);
            self.bills = res.data;
            if (res.data.length == 0)
              self.title = '对不起目前没有数据，可找后台管理员确认。';
          }
          else{
            self.$vux.alert.show({title: '错误', content: '加载失败！' + res.msg,});
          }
        });
      },
      detail(id,arrearage,amount){
        this.$router.push({name: 'myBillDetail',params:{id:id,arrearage:arrearage,amount:amount}});
      }
    }
  }
</script>

<style scoped>

</style>
