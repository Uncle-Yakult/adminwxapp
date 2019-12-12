<template>
    <div class="place-devices">
        <back></back>
        <div class="set-device" @click="codeGo">部署设备</div>
        <div style="height: 50px"></div>
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
        mounted(){
            let that = this;
            let $app = that.$app;
            let hotel_id = that.$route.query.id;
            $app.ajax("hotel/index/getDevicelists",{hotel_id},(res)=>{
                this.list = res.data
            })
        },
        methods:{
            toDeviceInfo(a){
                this.$router.push({path:"/deviceInfo",query:{
                        dryer_sn:a
                    }})
            },
            codeGo() {//扫码用机
                let that = this;
                let $app = that.$app;
                let hotel_id = that.$route.query.id;
                //调起 微信 jsSDK
                $app.wxJsSDK(function (wx) {
                    that.$vux.toast.text('启动相机', 'middle');
                    that.btnDisabled = true;
                    //二维码扫扫
                    $app.openCamera(code => {//需传经纬度
                        $app.ajax('device/dryer/getDryerInfo', {
                            dryer_sn: code,
                        }, (resData) => {
                            that.$router.push({
                                path: '/place/bind', query: {
                                    code,
                                    DryerInfo: resData.data,
                                    hotel_id
                                }
                            });
                        });
                    });
                });
            }
        },
        components:{
            Back
        }
    }
</script>

<style scoped>
    .place-devices .set-device{
        position: fixed;
        top: 10px;
        right: 0;
        height: 20px;
        padding: 5px 5px 5px 10px ;
        border: 1px solid #0090FF;
        border-right: none;
        background: white;
        border-radius: 15px 0 0 15px;
    }
    .place-devices .device-list .item{
        border-top: 5px solid #F7F7F7;
        padding-bottom: 10px;
        border-bottom: 1px solid #F7F7F7;
    }
    .place-devices .device-list p{
        padding: 5px 10px;
        border-bottom: 1px solid #dddddd;
        margin-bottom: 8px;
    }
    .place-devices .device-list .item-left{
        width: 25%;
        padding-left: 10px;
    }
    .place-devices .device-list .item-right {
        width: 50%;
    }
    .place-devices .device-list .item-left img{
        width: 60px;
        height: 60px;
        border-radius: 5px;
    }
</style>