<template>
  <app-layout title="订单确认" class="content-background" :showTabbar="false" :showBack="showBack">
    <div slot="content">
      <scroller :height="scrollerHeight" >
        <x-table :cell-bordered="false" style="background-color:#fff;width:420px;">
          <thead>
          <tr style="background-color: #EAEAEA;">
            <th style="width:150px;">品名</th>
            <th style="width:80px;">单位</th>
            <th style="width:130px;">本次订数</th>
            <th style="width:60px;">单价</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in list">
            <td ><p style="width:150px;text-overflow:ellipsis;white-space: nowrap;overflow:hidden ">{{item.Name}}</p></td>
            <td>{{item.Unit}}</td>
            <td><inline-x-number fillable style="display:block;" :min="0" width="50px" v-model="item.Quantity"></inline-x-number></td>
            <td>{{item.Price}}</td>
          </tr>
          </tbody>
        </x-table>

      </scroller>
      <section style="padding:15px;">
        <x-button  type="primary"  @click.native="validate" plain>提交请货</x-button>
      </section>
      <confirm v-model="showConfirm" title="确认是否继续" @on-confirm="submit">
        <div style="max-height:300px;overflow-y:scroll;font-size:10px;">{{confirmContent}}</div>
      </confirm>
    </div>
  </app-layout>
</template>

<script>
  import {Group,Cell,XTable,Scroller,XButton,InlineXNumber,Confirm  } from 'vux'
  import api from '../../api'

  export default {
    components:{Group,Cell,XTable,Scroller,XButton,InlineXNumber,Confirm  },
    data(){
      return{
        list:[],
        showBack:true,
        scrollerHeight:'',
        showConfirm:false,
        confirmContent:''
      }
    },
    mounted (){
      this.init();
    },
    methods: {
      init(){
        this.scrollerHeight = (document.documentElement.clientHeight-120) + 'px';
        this.list = this.$route.params.list;
        if(!this.$route.params.newOrder && this.$route.params.orderId){
          this.showBack= false;
        }
      },
      validate(){
        var self = this;
        self.$vux.loading.show({text: '提交中'});
        api.getOrderValidate(this.list).then(function(res){
          self.$vux.loading.hide();

          if(res.errcode==0){
            if(res.data =="" || res.data==null){
              self.submit();
            }
            else{
//              self.$vux.confirm.show({title:'确认是否继续',content:res.data,
//                onCancel () {},
//                onConfirm () {self.submit();}
//              });
              self.confirmContent=res.data;
              self.showConfirm = true;

            }
          }
          else{
            self.$vux.alert.show({title: '错误', content: '提交失败！' + res.msg,});
          }
        });
      },
      submit(){
        var self= this;
        self.$vux.loading.show({text: '提交中'});
        if(!this.$route.params.newOrder && this.$route.params.orderId){
          api.updateOrder({list:this.list,orderId:this.$route.params.orderId}).then(function (res) {
            self.$vux.loading.hide();
            if (res.errcode == 0) {
              sessionStorage.removeItem("tempOrderList");
              self.$vux.alert.show({
                title: '恭喜',
                content: '提交成功！',
                onHide () {
                  self.$router.push({name: 'orderHistory'});
                }
              })
            }
            else {
              self.$vux.alert.show({title: '错误', content: '提交失败！' + res.msg,});
            }
          });
        }
        else{
          api.postProduct(this.list).then(function (res) {
            self.$vux.loading.hide();
            if (res.errcode == 0) {
              sessionStorage.removeItem("tempOrderList");
              self.$vux.alert.show({
                title: '恭喜',
                content: '提交成功！',
                onHide () {
                  self.$router.push({name: 'orderHistory'});
                }
              })
            }
            else {
              self.$vux.alert.show({title: '错误', content: '提交失败！' + res.msg,});
            }
          });
        }

      },
    },

  }
</script>

<style scoped>
  th{
    font-weight:bold
  }
</style>
