<template>
    <div>
        <back></back>
        <nodata-view :show="!have"></nodata-view>
        <div class="place-items" v-if="have">
            <div class="subordinate-item" v-for="item in list">
                <img src="../../assets/image/右箭头.png" alt="" class="arrow-right">
                <div class="message" @click="toInfo(item.hotel_id)">
                    <img :src="item.images==null||item.images==''?common:item.images" alt="">
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
        name: "partner-next-place",
        data(){
            return{
                have:false,
                list:[]
            }
        },
        components:{
            NodataView,
            Back
        },
        mounted(){
            let that = this;
            let $app = that.$app;
            let id = that.$route.query.id;
            $app.ajax("hotel/index/lists",{admin_id:id},(res)=>{
                if(res.data==null||res.data==""){
                    this.have=false
                }else {
                    this.have=true
                    this.list=res.data
                }
            })
        }
    }
</script>

<style scoped>
    .place-items{
        background: #F7F7F7;
        padding: 5px;
    }
    .subordinate-item{
        margin-top: 5px;
        border-radius: 10px;
        height: 140px;
        position: relative;
        background: white;
        font-size: 12px;
        padding: 10px;
    }
    .subordinate-item .middle{
        display: flex;
        margin-top: 5px;
    }
    .subordinate-item .middle p{
        float: left;
        flex: 1;
        text-align: center;
    }
    .subordinate-item .middle span{
        color: #0078FF;
    }
    .subordinate-item .message{
        margin-left: 10px;
    }
    .subordinate-item .arrow-right{
        width: 20px;
        height: 20px;
        float: right;
    }
    .subordinate-item .message img{
        width: 50px;
        height: 50px;
        float: left;
        margin-right: 10px;
        margin-top: 5px;
    }
    .subordinate-item .control{
        display: flex;
        margin-top: 10px;
    }
    .subordinate-item .control li{
        flex: 1;
        text-align: center;
        height: 25px;
        line-height: 25px;
        margin-right: 2px;
        border-radius: 5px;
        background: #0078FF;
        color: white;
    }
</style>