<template>
    <div>
        <div class="header">
            <div class="top">
                <img src="../../assets/image/logo.png" alt="">
            </div>
            <ul class="bottom clearfix">
                <!--<li class="left">-->
                    <!--<p class="attr">本月收益</p>-->
                    <!--<p class="value">{{msg.this_month_profit}}</p>-->
                <!--</li>-->
                <!--<li class="center">-->
                    <!--<p class="attr">总收益（元）</p>-->
                    <!--<p class="value">{{msg.total_profit}}</p>-->
                <!--</li>-->
                <!--<li class="right">-->
                    <!--<p class="attr">今日收益</p>-->
                    <!--<p class="value">{{msg.today_profit}}</p>-->
                <!--</li>-->
                <li>
                    <p>收益数<span class="total">总</span></p>
                    <h2>{{msg.total_profit}}</h2>
                    <p>今日新增收益数<span class="icon icon-cny"></span><span class="count">{{msg.today_profit}}</span></p>
                </li>
                <li>
                    <p>使用次数<span class="total">总</span></p>
                    <h2>{{msg.count_orders}}</h2>
                    <p>今日使用次数<span class="icon icon-yonghu"></span><span class="count">{{msg.count_today_orders}}</span></p>
                </li>
                <li>
                    <p>网点数<span class="total">总</span></p>
                    <h2>{{msg.count_hotels}}</h2>
                    <p>今日新部署<span class="icon icon-flag"></span><span class="count">{{msg.count_today_hotels}}</span></p>
                </li>
                <li>
                    <p>设备数<span class="total">总</span></p>
                    <h2>{{msg.count_devices}}</h2>
                    <p>今日新部署<span class="icon icon-dingwei"></span><span class="count">{{msg.count_today_devices}}</span></p>
            </li>
            </ul>
        </div>
        <!--<div class="nav">-->
            <!--<el-row :gutter="10">-->
                <!--<el-col :span="8" class="nav-item">-->
                    <!--<span  @click="toPartner">-->
                    <!--<img src="../../assets/image/1.png" alt="">-->
                    <!--<p>代理管理</p>-->
                    <!--</span>-->
                <!--</el-col>-->
                <!--<el-col :span="8" class="nav-item">-->
                <!--<span>-->
                    <!--<img src="../../assets/image/6.png" alt="">-->
                    <!--<p>后台说明</p>-->
                    <!--<span class="tishi">新</span>-->
                <!--</span>-->
                <!--</el-col>-->
            <!--</el-row>-->
        <!--</div>-->
        <income :xAxis="Xzhou" :series="series" v-if="series.length"></income>
        <div class="new-add">
            <ul class="tag">
                <li>
                    <span class="icon"></span>
                    <span class="a">网点总数</span>
                    <span class="b">{{msg.count_hotels}}</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="a">设备总数</span>
                    <span class="b">{{msg.count_devices}}</span>
                </li>
            </ul>
            <ul class="tag">
                <li>
                    <span class="icon"></span>
                    <span class="a">总订单数</span>
                    <span class="b">{{msg.count_orders}}</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="a">总收益数</span>
                    <span class="b">￥{{msg.total_profit}}</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="a">总营业额</span>
                    <span class="b">￥{{msg.total_business_amount}}</span>
                </li>
            </ul>
            <ul class="tag">
                <li>
                    <span class="icon"></span>
                    <span class="a">{{month}}月订单数</span>
                    <span class="b">{{msg.count_this_month_orders}}</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="a">{{month}}月收益</span>
                    <span class="b">￥{{msg.this_month_profit}}</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="a">{{month}}月营业额</span>
                    <span class="b">￥{{msg.this_month_business_amount}}</span>
                </li>
            </ul>
            <ul class="tag">
                <li>
                    <span class="icon"></span>
                    <span class="a">昨日订单数</span>
                    <span class="b">{{msg.count_yesterday_orders}}</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="a">昨日收益</span>
                    <span class="b">￥{{msg.yesterday_profit}}</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="a">昨日营业额</span>
                    <span class="b">￥{{msg.yesterday_business_amount}}</span>
                </li>
            </ul>
        </div>
        <tab></tab>
    </div>
</template>
<script>
    import Income from "@/base/progress"
    import Tab from "@/base/tab"
    export default {
        data() {
            return {
                msg:{},
                Xzhou:[],
                series:[],
                month:"",
                year:''
            }
        },
        components: {
            Income,
            Tab
        },
        methods: {
            toPartner(){
                this.$router.push("/partner")
            }
        },
        mounted(){
            let that = this;
            let $app = this.$app;
            let id = $app.getCookie("admin_id");
            let myDate = new Date();
            this.month = myDate.getMonth()+1;
            if($app.judageData(id)){
                $app.ajax('common/login/autoLogin',{admin_id:id},()=>{
                    $app.ajax("distributor/index/home",{admin_id:id},(res)=>{
                        this.msg = res.data;
                        let week_income_list = res.data.week_income_list;
                        let Xzhou = [];
                        let series = [];
                        for(let i in week_income_list){
                            Xzhou.unshift(week_income_list[i].date);
                            series.unshift(week_income_list[i].profit)
                        }
                        that.Xzhou = Xzhou;
                        that.series = series;
                        that.year = res.data.format_date.substring(0,3)
                    })
                })
                return;
            }
            $app.ajax("distributor/index/home",{admin_id:id},(res)=>{
                this.msg = res.data;
                let week_income_list = res.data.week_income_list;
                let Xzhou = [];
                let series = [];
                for(let i in week_income_list){
                    Xzhou.unshift(week_income_list[i].date);
                    series.unshift(week_income_list[i].profit)
                }
                that.Xzhou = Xzhou;
                that.series = series;
                that.year = res.data.format_date.substring(0,3)
            })
        }
    }

</script>

<style scoped>
    @import "~@/assets/css/header.css";
    @import "~@/assets/css/nav.css";
    .new-add{
        padding-bottom: 50px;
    }
    .new-add .tag{
        border: 10px solid #efeff4;
        border-bottom: 0px solid transparent;
        padding: 15px;
        font-size: 16px;
    }
    .new-add .tag li{
        line-height: 21px;
        padding: 3px 0;
    }
    .new-add .tag:last-child{
        border-bottom: 10px solid #efeff4;
    }
    .new-add .icon{
        display: block;
        float: left;
        margin-top: 1px;
        width: 7px;
        height: 17px;
        margin-right: 5px;
        background-color: #0078FF;
    }
    .new-add .b{
        float: right;
        font-weight: bold;
    }
</style>