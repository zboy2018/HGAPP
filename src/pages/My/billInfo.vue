<template>
  <app-layout title="对账单明细" class="content-background" :showTabbar="false">
    <div slot="content">
      <section style="padding:10px;">
        <button-tab>
          <button-tab-item selected @on-item-click="tabClick(0)">单品汇总</button-tab-item>
          <button-tab-item @on-item-click="tabClick(1)">对账单</button-tab-item>
        </button-tab>
        <p style="padding-top:8px;color:#CD3333">本期欠款：￥{{arrearage}}元  </p>
      </section>
       <section v-if="showList">
         <x-table :cell-bordered="false" class="bill-table">
           <thead>
           <tr style="background-color: #EAEAEA;">
             <th >品名</th>
             <th class="bill-col-amount">金额</th>
             <th class="bill-col-discount">折扣</th>
             <th class="bill-col-total">小计</th>
             <th class="bill-col-quantity">数量</th>
             <th class="bill-col-unit">单位</th>

           </tr>
           </thead>
         </x-table>
         <scroller lock-x :height="scrollerHeightA" ref="scrollerEvent">
           <x-table :cell-bordered="false" class="bill-table">
             <tbody>
             <tr v-for="item in bList">
               <td ><p style="line-height:16px">{{item.MaterialName}}</p></td>
               <td class="bill-col-amount">{{item.Amount}}</td>
               <td class="bill-col-discount">{{item.Discount==0?"":item.Discount}}</td>
               <td class="bill-col-total">{{item.Amount+item.Discount}}</td>
               <td class="bill-col-quantity">{{item.Quantity==0?"":item.Quantity}}</td>
               <td class="bill-col-unit">{{item.MaterialUnit}}</td>

             </tr>
             </tbody>
           </x-table>
         </scroller>
     </section>
      <section  v-if="showDailyList">
        <x-table :cell-bordered="false" class="bill-table">
          <thead >
          <tr style="background-color: #EAEAEA;">
            <th class="bill-col-date">日期</th>
            <th >品名</th>
            <th class="bill-col-amount">金额</th>
            <th class="bill-col-discount">折扣</th>
            <th class="bill-col-total">小计</th>
            <th class="bill-col-quantity">数量</th>
            <th class="bill-col-unit">单位</th>
          </tr>
          </thead>
        </x-table>
        <scroller  lock-x :height="scrollerHeightB" ref="scrollerEvent">
          <x-table :cell-bordered="false" class="bill-table">

            <tbody>
            <tr v-for="item in aList">
              <td class="bill-col-date">{{item.BillDate.substring(5, 10).replace('-','')}}</td>
              <td ><p style="line-height: 16px">{{item.MaterialName}}</p></td>
              <td class="bill-col-amount">{{item.Amount}}</td>
              <td class="bill-col-discount">{{item.Discount==0?"":item.Discount}}</td>
              <td class="bill-col-total">{{item.Amount+item.Discount}}</td>
              <td class="bill-col-quantity">{{item.Quantity==0?"":item.Quantity}}</td>
              <td class="bill-col-unit">{{item.MaterialUnit}}</td>
              <!--<td ><p style="width:90px;text-overflow:ellipsis;white-space: nowrap;overflow:hidden ">{{item.MaterialName}}</p></td>-->

            </tr>
            </tbody>
          </x-table>
        </scroller>
      </section>
    </div>
  </app-layout>
</template>

<script>
  import {Group,Cell,XTable,Scroller,ButtonTab,ButtonTabItem } from 'vux'
  import api from '../../api'
  export default {
    components:{Group,Cell,XTable,Scroller,ButtonTab, ButtonTabItem },
    data(){
      return{
        showList:true,
        showDailyList:false,
        aList:[],
        bList:[],
        arrearage:0,
        amount:0,
        scrollerHeightA:'',
        scrollerHeightB:''
      }
    },
    mounted (){
      this.init();
    },
    methods: {
      init(){
        var self= this;
        self.scrollerHeightA = (document.documentElement.clientHeight-161) + 'px';
        self.scrollerHeightB = (document.documentElement.clientHeight-161) + 'px';
        self.arrearage=this.$route.params.arrearage;
        self.amount=this.$route.params.amount;
        self.$vux.loading.show({text: '加载中'});
        api.getUserBillDetail({billId:this.$route.params.id}).then(function (res) {
          self.$vux.loading.hide();
          if(res.errcode==0) {
            self.aList = res.data.AList;
            self.bList = res.data.BList;
          }
          else{
            self.$vux.alert.show({title: '错误', content: '加载失败！' + res.msg,});
          }
        });
      },
      tabClick (index) {
        if(index==0)
        {
          this.showList=true;
          this.showDailyList=false;
          this.$refs.scrollerEvent.reset({top: 0});
        }
        else {

          this.showList=false;
          this.showDailyList=true;
          this.$refs.scrollerEvent.reset({top: 0});

        }

      },
    }
  }
</script>

<style scoped>
  .bill-table{
    background-color:#fff;width:100%;font-size:9px;line-height:28px;table-layout: fixed
  }
  .bill-col-date{
    width:38px;;
  }
  .bill-col-total,.bill-col-amount{
    width:60px;
  }
  .bill-col-discount{
    width:40px;;
  }

  .bill-col-quantity{
    width:33px;
  }
  .bill-col-unit{
    width:38px;;
  }

th{
  font-weight:bold;
  text-align: left;
  padding-left:3px;
}
  td{
    text-align: left;
    padding-left:3px;
  }
</style>
