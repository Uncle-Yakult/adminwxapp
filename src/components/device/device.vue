<template>
    <div>
        <back></back>
        <ul class="list1">
            <li class="active">工作中(0)</li>
            <li>待机中(0)</li>
            <li>离线中(0)</li>
        </ul>
        <div class="search clearfix">
            <img src="../../assets/image/s.png" alt="">
            <input type="search" placeholder="请输入搜索内容">
            <div class="select fr">
                <select ref="deciveModeId" @change="showValue">
                    <option value="1">密码线充5键</option>
                </select>
                <span class="icon-down"></span>
            </div>
        </div>
        <div class="device-list">
            <div class="item clearfix" v-for="item in list">
                <p>设备编号：{{item.dryer_sn}}</p>
                <div class="item-left fl">
                    <img :src="common" alt="">
                </div>
                <ul class="item-right fl">
                    <li>部署网点：{{item.hotel_name}}</li>
                    <li>最近使用：{{item.last_used_time}}</li>
                    <li>扫码次数：{{item.total_use_times}}次</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import Back from "@/base/back"
    export default {
        data(){
          return{
              common:require("../../assets/image/ban.png"),
              list:[]
          }
        },
        components:{
            Back
        },
        methods:{
            showValue(){
                let index = parseInt(this.$refs.deciveModeId.value)
            }
        },
        mounted(){
            let that = this;
            let $app = that.$app;
            // let admin_id = sessionStorage.getItem("admin-id");
            let admin_id = this.$route.query.id;
            $app.ajax("device/dryer/lists",{admin_id},(res)=>{
                this.list = res.data
            })
        }
    }
</script>

<style scoped>
    @import "~@/assets/css/device.css";
     .device-list .item{
        border-top: 5px solid #F7F7F7;
        padding-bottom: 10px;
        border-bottom: 1px solid #F7F7F7;
    }
     .device-list p{
        padding: 5px 10px;
        border-bottom: 1px solid #dddddd;
        margin-bottom: 8px;
    }
     .device-list .item-left{
        width: 25%;
        padding-left: 10px;
    }
     .device-list .item-right {
        width: 50%;
         margin-top: 3px;
    }
     .device-list .item-left img{
        width: 60px;
        height: 60px;
        border-radius: 5px;
    }
</style>