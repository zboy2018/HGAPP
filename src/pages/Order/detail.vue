<template>
  <app-layout title="订单详情" class="content-background" :showTabbar="false">
    <div slot="content">
      <group>
        <cell title="合计" :value="amount"></cell>
        <cell-form-preview :list="list"></cell-form-preview>
      </group>
    </div>
  </app-layout>
</template>

<script>
  import {Group,Cell,CellFormPreview  } from 'vux'
  import api from '../../api'

  export default {
    components:{Group,Cell,CellFormPreview  },
    data(){
      return{
        amount:".",
        list: []
      }
    },
    mounted (){
      this.init();
    },
    methods: {
      init(){
        var self= this;
        self.amount = '￥'+this.$route.params.amount+'元';
        api.getOrderDetail({orderId:this.$route.params.orderId}).then(function (res) {
          var list = [];
          res.data.forEach(function (el) {
            list.push(
              {
                label: el.MaterialName +' × '+el.Quantity+ "(" + el.Unit + ')',
                value:'￥'+el.Amount
              });
          });
          self.list= list;
        });
      }
    }
  }
</script>

<style scoped>
  th{
    font-weight:bold
  }
</style>
