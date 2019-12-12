<template>
    <div class="infoPlace">
        <back></back>
        <div class="del" @click="delPlace(msg.hotel_id)">删除网点</div>
        <div class="pic">
            <img :src="msg.images" alt="">
        </div>
        <ul class="message">
            <li><img src="../../assets/image/place/1.png" alt="">网点名称：{{msg.hotel_name}}</li>
            <li><img src="../../assets/image/place/2.png" alt="">网点类型：{{msg.type_name}}</li>
            <li><img src="../../assets/image/place/t1.png" alt="">所属代理：{{msg.admin_name}}</li>
            <li><img src="../../assets/image/place/5.png" alt="">网点地址：{{msg.address}}</li>
            <li><span @click="toEdit(msg.hotel_id)">修改网点</span></li>
        </ul>
        <div class="equipment">
            <ul>
                <li>已部署设备（{{msg.total_devices}}）<span @click="toDevices(msg.hotel_id)">查看</span></li>
                <li>网点收益（{{msg.total_profit}}元）</li>
                <li>已部署设备类型：{{device_type}}</li>
            </ul>
        </div>
        <income :xAxis="Xzhou" :series="series" v-if="series.length"></income>
        <ul class="tag">
            <li>
                <span class="icon"></span>
                <span class="a">总扫码次数</span>
                <span class="b">{{msg.total_uses}}</span>
            </li>
            <li>
                <span class="icon"></span>
                <span class="a">总收益数</span>
                <span class="b">{{msg.total_profit}}</span>
            </li>
            <li>
                <span class="icon"></span>
                <span class="a">总营业额</span>
                <span class="b">{{msg.total_amount}}</span>
            </li>
        </ul>
        <ul class="tag">
            <li>
                <span class="icon"></span>
                <span class="a">{{month}}月扫码次数</span>
                <span class="b">{{msg.this_month_uses}}</span>
            </li>
            <li>
                <span class="icon"></span>
                <span class="a">{{month}}月收益</span>
                <span class="b">￥{{msg.this_month_profit}}</span>
            </li>
            <li>
                <span class="icon"></span>
                <span class="a">{{month}}月营业额</span>
                <span class="b">￥{{msg.this_month_amount}}</span>
            </li>
        </ul>
        <ul class="tag">
            <li>
                <span class="icon"></span>
                <span class="a">{{msg.yesterday_date}}日扫码次数</span>
                <span class="b">{{msg.yseterday_use}}</span>
            </li>
            <li>
                <span class="icon"></span>
                <span class="a">{{msg.yesterday_date}}日收益</span>
                <span class="b">￥{{msg.yesterday_profit}}</span>
            </li>
            <li>
                <span class="icon"></span>
                <span class="a">{{msg.yesterday_date}}日营业额</span>
                <span class="b">￥{{msg.yesterday_amount}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import Back from "@/base/back"
    import Income from "@/base/progress"
    export default {
        data(){
            return{
                msg:"",
                month:"",
                device_type:"",
                Xzhou:[],
                series:[]
            }
        },
        components:{
            Back,
            Income
        },
        methods:{
            toEdit(a){//转到修改网点页
                this.$router.push({path:"/place/edit",query:{id:a}})
            },
            toDevices(a){//转到网点设备页
                this.$router.push({path:"/place/place-devices",query:{id:a}})
            },
            delPlace(a){//删除网点
                let that = this;
                let $app = that.$app;
                $app.ajax("hotel/index/delete",{hotel_id:a},(res)=>{
                    $app.toast(res.msg);
                    that.$router.push("/place/list")
                })
            }
        },
        mounted(){
            let that = this;
            let $app = that.$app;
            let id = this.$route.query.id;
            $app.ajax("hotel/index/detail",{hotel_id:id},(res)=>{
                this.msg = res.data;
                let week_income_list = res.data.week_profit;
                let Xzhou = [];
                let series = [];
                for(let i in week_income_list){
                    Xzhou.unshift(week_income_list[i].date);
                    series.unshift(week_income_list[i].profit)
                }
                this.Xzhou = Xzhou;
                this.series = series;
                this.device_type = res.data.device_types.toString()
            });
            let myDate = new Date();
            this.month = myDate.getMonth()+1;
        }
    }
</script>

<style scoped>
    .infoPlace .del{
        position: fixed;
        top: 10px;
        right:0;
        width: 75px;
        text-align: center;
        z-index: 10;
        line-height: 30px;
        height: 30px;
        background: red;
        color: white;
        font-size: 13px;
        border-radius: 15px 0 0 15px;
    }
    .infoPlace .pic{
        width: 100%;
        height:245px;
        background: #cccccc;
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .infoPlace .pic img{
        max-height: 100%;
        max-width: 100%;
        margin: 0 auto;
    }
    .infoPlace .message{
        padding: 30px 25px;
        background: white;
        margin-bottom: 8px;
        border-radius:10px 10px 0 0;
        position: relative;
        top: 0;
        margin-top: 200px;
        z-index: 3;
        border-bottom: 5px solid #F7F7F7;
    }
    .infoPlace .message li{
        height: 20px;
        line-height: 20px;
        padding-bottom: 8px;
    }
    .infoPlace .message img{
        width: 20px;
        height: 20px;
        display: inline-block;
        margin-right: 10px;
        vertical-align: middle;
    }
    .infoPlace .message li:last-child{
        margin-top: 15px;
    }
    .infoPlace .message li:last-child span{
        display: block;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: white;
        background: #0078FF;
        border-radius: 13.5px;
        margin: 0 auto;
    }
    .infoPlace .equipment{
        padding: 10px 30px;
    }
    .infoPlace .equipment li{
        height: 40px;
        line-height: 40px;
    }
    .infoPlace .equipment span{
        margin-top: 7px;
        float: right;
        width:70px;
        height: 25px;
        display: block;
        text-align: center;
        line-height: 25px;
        color: white;
        background: #0078FF;
        border-radius: 13.5px;
    }
    .infoPlace .tag{
        border: 10px solid #efeff4;
        border-bottom: 0px solid transparent;
        padding: 15px;
        font-size: 16px;
    }
    .infoPlace .tag li{
        line-height: 21px;
        padding: 3px 0;
    }
    .infoPlace .tag:last-child{
        border-bottom: 10px solid #efeff4;
    }
    .infoPlace .icon{
        display: block;
        float: left;
        margin-top: 1px;
        width: 7px;
        height: 17px;
        margin-right: 5px;
        background-color: #0078FF;
    }
    .infoPlace .b{
        float: right;
        font-weight: bold;
    }
</style>