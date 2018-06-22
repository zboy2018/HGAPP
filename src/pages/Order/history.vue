<template>
  <app-layout title="订单" tarbarIndex="3" :showBack="false">
    <div slot="content" class="content-background">
      <!--<flexbox  style="padding:5px;">-->
        <!--<flexbox-item ><x-button type="primary" plain @click.native="selectFrom"><i style="font-size:.5rem;color:black">开始：</i> {{query.from}}</x-button></flexbox-item>-->
        <!--<flexbox-item  ><x-button type="primary" plain @click.native="selectTo"><i style="font-size:.5rem;color:black">结束：</i> {{query.to}}</x-button></flexbox-item>-->
      <!--</flexbox>-->
      <h3 style="text-align: center;color:gray;margin: 10px;;" v-if="list.length==0">无历史订单数据</h3>
      <group>
        <cell v-for="item in list" :inline-desc="item.CreateTime.substring(0, 10)">
          <span slot="title" style="font-size:15px;;">{{item.OrderName}}</span>
          <flexbox solt="default" orient="vertical">
            <flexbox-item ><x-button type="primary" v-if="item.Status==0"  mini @click.native="edit(item.Id)">编辑订单</x-button></flexbox-item>
            <flexbox-item ><x-button type="primary" v-if="item.Status==1"  mini @click.native="again(item.Id)">再来一单</x-button></flexbox-item>
            <flexbox-item ><x-button type="default" plain mini @click.native="detail(item.Id,item.Amount)" >查看详情</x-button></flexbox-item>
          </flexbox>
        </cell>
      </group>
    </div>
  </app-layout>
</template>

<script>
  import {Datetime,Group,Cell,Flexbox,FlexboxItem,XButton ,Panel} from 'vux'
  import api from '../../api'

  export default {
    components: {Datetime, Group, Cell, Flexbox, FlexboxItem, XButton, Panel},
    data(){
      return {
        list: [{}],
        query: {}
      }
    },
    methods: {
      selectFrom () {
        var _this = this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          //value: '2018-05-20',
          onConfirm (val) {
            _this.query.from = val;
          },
        })
      },
      selectTo () {
        var _this = this;
        this.$vux.datetime.show({
          cancelText: '取消',
          confirmText: '确定',
          format: 'YYYY-MM-DD',
          onConfirm (val) {
            console.log('plugin confirm', val);
            _this.query.to = val;
          },

        })
      },
      onImgError (item, $event) {
        console.log(item, $event)
      }
    },
    mounted (){
      this.init();
    },
    methods: {
      init(){
        var self = this;
        self.$vux.loading.show({text: '加载中'});
        api.getOrder().then(function (res) {
          self.$vux.loading.hide();
          if (res.errcode != 0) {
            self.$vux.alert.show({title: '提示', content: res.msg,});
            self.$router.push({name: 'my'});
          }
          else {
            self.list = res.data;
          }
        });
      },
      detail(orderId,amount){
        this.$router.push({name: 'orderDetail', params: {orderId: orderId, amount: amount}});
      },
      again(orderId){
        this.$router.push({name: 'order', params: {orderId: orderId,newOrder:true}});
      },
      edit(orderId){
        this.$router.push({name: 'order', params: {orderId: orderId,newOrder:false}});
      }


    },
  }
</script>

<style scoped>

</style>
