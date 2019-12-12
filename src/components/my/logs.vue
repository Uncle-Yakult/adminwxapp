<template>
    <div class="logs">
        <back></back>
        <div style="height: 50px"></div>
        <div class="items">
             <ul class="item" v-for="item in list">
                    <li>交易单号：<span>{{item.order_sn}}</span></li>
                    <li>网点名称：<span>{{item.hotel_name}}</span></li>
                    <li>交易金额：<span style="color: #0090FF">{{item.consumption_amount}}元</span></li>
                    <li>分成金额：<span style="color: #0090FF">{{item.profit}}元</span></li>
                    <li>设备类型：<span class="type">{{item.dryer_type_name}}</span></li>
                    <li>结算状态：<span style="color: #0090FF">{{item.state}}</span></li>
                    <li>结算时间：<span>{{item.add_time}}</span></li>
                    <li>套餐时长：<span>{{(item.hours/60).toFixed(2)}}小时</span></li>
             </ul>
        </div>
        <nodata-view :show="!have"></nodata-view>
    </div>
</template>

<script>
    import NodataView from "@/base/nodata-view"

    import Back from "@/base/back"
    export default {//分成记录
        data(){
            return{
                list:[],
                have:false
            }
        },
        components:{
            Back,
            NodataView
        },
        mounted(){
            let that = this;
            let $app = this.$app;
            let admin_id = $app.getCookie("admin_id");
            $app.ajax("distributor/index/profitRecord",{admin_id},(res)=>{
                if(res.data == null||res.data == ""){
                    this.have = false
                }else{
                    this.list = res.data;
                    this.have = true
                }
            })
        }
    }
</script>

<style scoped>
    .logs .items{
        padding: 0 10px;
    }
    .logs .items .item{
        border: 1px solid #ddd;
        padding: 10px;
        margin-top: 5px;
        border-radius: 5px;
    }
    .logs .items .item li{
        padding: 3px 0;
    }
    .logs .items .item li:first-child{
        border-bottom: 1px solid #dddddd;
    }
    .logs .items .item .type{
        color: #4EC361;
    }
    .logs .items .item span {
        margin-left: 10px;
    }
</style>