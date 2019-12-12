<template>
    <div>
        <back :to="1"></back>
        <div class="place-nav" v-if="">
            <div class="left">
                <input type="text" placeholder="搜索网点" v-model="search" @blur="searchPlace">
                <img class="icon" src="../../assets/image/s.png">
            </div>
            <div class="right">
                <ul>
                    <li>
                        <span @click="toadd">新增网点</span>
                    </li>
                    <li>
                        <span :class="[isTouch==2?'active':'']" @click="myplace">我的网点</span>
                        <span :class="[isTouch==3?'active':'']" @click="childplace">下级网点</span>
                    </li>
                </ul>
            </div>
        </div>
        <nodata-view :show="!have"></nodata-view>
        <div class="place-items" v-if="have">
            <div class="subordinate-item" v-for="item in list">
                <img src="../../assets/image/右箭头.png" alt="" class="arrow-right">
                <div class="message" @click="toInfo(item.hotel_id)">
                    <img :src="item.images?item.images:common" alt="">
                    <p>{{item.hotel_name}}</p>
                    <p>
                        所属：{{item.belong_to}}
                    </p>
                    <p>收益：
                        <span>总：{{item.total_profit}} </span><span>月：{{item.this_month_profit}} </span><span>日：{{item.today_profit}} </span>
                    </p>
                    <p>扫码：
                        <span>总：{{item.total_uses}}</span><span>日：{{item.day_uses}} </span>
                    </p>
                </div>
                <div class="middle clearfix">
                    <p><span>{{item.profit_percent}}</span><br/>分成比例</p>
                    <p><span>{{item.count_devices}}</span><br/>设备数</p>
                </div>
                <ul class="control">
                    <!--<li>价格设置</li>-->
                    <li @click="checkDeivce(item.hotel_id)">查看设备</li>
                    <li @click="codeGo(item.hotel_id)">扫码绑定</li>
                    <li @click="toEdit(item.hotel_id)">编辑</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import NodataView from "@/base/nodata-view"
    import Back from "@/base/back"
    export default {
        data(){
            return{
                list:[],
                show:"",
                have:false,
                isTouch:2,
                search:"",
                common:require("../../assets/image/ban.png")
            }
        },
        methods:{
            toadd(){//进入新增网点页面
                this.$router.push("/place/add")
            },
            myplace(){//转换为我的网点
                this.isTouch = 2;
            },
            childplace(){//转换为下级网点
                this.isTouch = 3;
            },
            searchPlace(){//搜索网点
                let $app = this.$app;
                if(this.search){
                    $app.ajax("hotel/index/getListByFuzzy",{param:this.search},(res)=>{
                        if(res.data){
                            this.have = true;
                            this.list = res.data
                        }else{
                            this.have = false;
                        }
                    })
                }else{
                    $app.ajax("hotel/index/lists",{filter:2},(res)=>{//初始加载列表
                        if(res.data == null){
                            this.have = false;
                        }else{
                            this.have = true;
                            that.list = res.data
                        }
                    })
                }
            },
            toEdit(a){//进入网点编辑页
                this.$router.push({path:"/place/edit",query:{id:a}})
            },
            toInfo(a){//进入网点详情页
                this.$router.push({path:"/place/info",query:{id:a}})
            },
            codeGo(a) {//扫码用机
                let that=this;
                let $app=that.$app;
                //调起 微信 jsSDK
                $app.wxJsSDK(function (wx) {
                    that.$vux.toast.text('启动相机', 'middle');
                    that.btnDisabled=true;
                    //二维码扫扫
                    $app.openCamera(code=>{//需传经纬度
                        $app.ajax('device/dryer/getDryerInfo', {
                            dryer_sn: code,
                        }, (resData) => {
                                that.$router.push({path:'/place/bind',query:{
                                    code,
                                    DryerInfo:resData.data,
                                    hotel_id:a
                                    }});
                        });
                    });

                });
            },
            checkDeivce(a){//进入查看设备页
                this.$router.push({path:"/place/place-devices",query:{id:a}})
            }
        },
        components:{
            Back,
            NodataView
        },
        mounted(){
            let that = this;
            let $app = that.$app;
            $app.ajax("hotel/index/lists",{filter:2},(res)=>{//初始加载列表
                console.log(res)
                if(res.data == null){
                    this.have = false;
                }else{
                    this.have = true;
                    that.list = res.data
                }
            })
        },
        watch:{
            isTouch:function(){
                let $app = this.$app;
                $app.ajax("hotel/index/lists",{filter:this.isTouch},(res)=>{
                    if(res.data){
                        this.list = res.data;
                        this.have = true;
                    }else {
                        this.have = false
                    }
                })
            }
        }
    }
</script>

<style scoped>
    @import "~@/assets/css/place.css";
</style>