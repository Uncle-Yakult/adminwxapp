<template>
    <div class="next-devices">
        <back></back>
		<div style="height: 50px;"></div>
        <div class="device-list">
            <div class="item clearfix" v-for="item in list" @click="toDeviceInfo(item.dryer_sn)">
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
        <nodata-view :show="!have"></nodata-view>
    </div>
</template>

<script>
    import NodataView from "@/base/nodata-view"
    import Back from "@/base/back"
    export default {
        data(){
            return{
                list:[],
                have:false,
				common:require("../../assets/image/ban.png")
            }
        },
       components:{
           Back,
           NodataView
       },
        methods:{
            toDeviceInfo(a){
                this.$router.push({path:"/deviceInfo",query:{
                        dryer_sn:a
                    }})
            }
        },
        mounted(){
           let that = this;
           let $app = that.$app;
           let admin_id = this.$route.query.id;
		   $app.ajax("distributor/index/currentAdmin",{admin_id},(res)=>{
			   if($app.judageData(res.data.avatar)){
				   that.common = res.data.avatar
			   }
		   })
           $app.ajax("device/dryer/lists",{admin_id},(res)=>{
               if(res.data==null||res.data==""){
                   this.have = false
               }else{
                   this.list = res.data
                    this.have = true
               }
           })
        }
    }
</script>

<style scoped>
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