<template>
    <div class="detailPartner">
        <back></back>
        <div class="top">
            <ul>
                <li>账户余额（元）</li>
                <li class="num">{{msg.balance}}</li>
                <li>
                    <span class="fl">入驻人：{{msg.admin_name}}</span>
                    <span class="fr">已入驻：{{msg.days}}天</span>
                </li>
            </ul>
        </div>
        <div class="center">
            <div><p>{{msg.count_childs}}</p>下级代理数</div>
            <div><p>{{msg.count_hotels}}</p>网点总数</div>
        </div>
        <div class="bottom">
            <ul class="tag">
                <li>
                    <span class="icon"></span>
                    <span class="a">总订单数</span>
                    <span class="b">{{msg.count_orders}}</span>
                </li>
                <li>
                    <span class="icon"></span>
                    <span class="a">总收益</span>
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
    </div>
</template>

<script>
    import Back from "@/base/back"
    export default {
        name: "detail",
        data(){
          return{
                msg:{},
                month:""
          }
        },
        components:{
            Back
        },
        mounted(){
            let that = this;
            let $app = this.$app;
            let admin_id = parseInt(this.$route.query.id);
            $app.ajax("distributor/index/detail",{admin_id},(res)=>{
                    this.msg = res.data
            })
            let myDate = new Date();
            this.month = myDate.getMonth()+1;
        }
    }
</script>

<style scoped>
    .detailPartner{
        padding: 50px 0 30px 0 ;
        background: #F7F7F7;
    }
    .detailPartner .top{
        margin: 0 10px;
        font-size: 14px;
        padding: 50px 0 7px;
        text-align: center;
        height: 130px;
        background: #0078FF;
        border-radius: 5px;
        color: white;
    }
    .detailPartner .top ul li:last-child{
        margin: 0 10px;
    }
    .detailPartner .top .num{
        font-size: 27px;
        font-weight: bold;
        padding-bottom: 45px;
    }
    .detailPartner .center{
        margin: 10px 10px 5px;
        text-align: center;
        display: flex;
    }
    .detailPartner .center div{
        flex: 1;
        background: white;
        padding: 20px 0;
        height: 40px;
        border-radius: 5px;
    }
    .detailPartner .center div p{
        color: #0078FF;
        font-size: 18px;
        font-weight: 500;
    }
    .detailPartner .center div:first-child {
        margin-right: 10px;
    }
    .detailPartner .bottom .tag{
        border: 5px solid  #F7F7F7;
        /*border-bottom: 0px solid transparent;*/
        padding: 15px;
        background: white;
        font-size: 16px;
    }
    .detailPartner .bottom .tag li{
        line-height: 21px;
        padding: 3px 0;
    }
    .detailPartner .bottom .icon{
        display: block;
        float: left;
        margin-top: 1px;
        width: 7px;
        height: 17px;
        margin-right: 5px;
        background-color: #0078FF;
    }
    .detailPartner .bottom .b{
        float: right;
        font-weight: bold;
    }
</style>