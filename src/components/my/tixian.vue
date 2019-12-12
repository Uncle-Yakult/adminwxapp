<template>
    <div class="tixian">
        <back :to="2"></back>
        <header>
            <div style="height:50px"></div>
            <ul class="title">
                <li><span>可提现金额</span><span class="fr">银行卡<i></i></span></li>
                <li class="price">{{able_cash_out_amount}}</li>
                <li><button @click="toCashIn">申请提现</button></li>
                <img src="../../assets/image/money.png" alt="">
            </ul>
        </header>
        <div class="line">
            <div>
                <span>提现记录</span>
            </div>
        </div>
        <div class="content">
            <ul>
                <li>
					<span>日期</span>
					<span>金额（实收）</span>
					<span>状态</span>
				</li>
                <li v-for="item in msg">
					<span>{{item.apply_add_date}}</span>
					<span>{{item.apply_cash_amount}}</span>
					<span>{{item.state_name}}</span>
				</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Back from "@/base/back"
    export default {//申请提现
        name: "tixian",
        data(){
            return{
                msg:"",
				able_cash_out_amount:""
            }
        },
        methods:{
            toCashIn(){
                this.$router.push("/cashIn")
            }
        },
        components:{
            Back
        },
        mounted(){
            let $app = this.$app;
            let admin_id = $app.getCookie("admin_id");
			$app.ajax("distributor/index/currentAdmin",{admin_id},(res)=>{
				this.able_cash_out_amount = res.data.able_cash_out_amount
			})
            $app.ajax("distributor/index/cashOutRecord",{admin_id},(res)=>{
                this.msg = res.data
            })
        }
    }
</script>

<style scoped>
    .tixian{
        background: #0078FF;
    }
    .tixian .title{
        color: white;
        padding: 10px;
        height: 150px;
        position: relative;
    }
    .tixian .title img{
        position: absolute;
        top: 59px;
        left: 9px;
    }
    .tixian .title li:nth-child(3){
        text-align: center;
    }
    .tixian .title button{
        color: white;
        background: transparent;
        padding: 5px 10px;
        border: 1px solid white;
        border-radius: 20px;
    }
    .tixian .title .price{
        padding: 10px 0;
        font-size: 30px;
        text-align: center;
    }
    .tixian .line{
        padding: 0 10px;
        height: 40px;
        background: white;
        border-radius: 15px 15px 0 0;
    }
    .tixian .line div{
        border-bottom: 1px dashed #dddddd;
        position: relative;
        height: 30px;
    }
    .tixian .line div span{
        width: 60px;
        text-align: center;
        position: absolute;
        background: white;
        bottom: -10px;
        left: 50%;
        margin-left: -30px;
    }
    .tixian .content{
        background: white;
        padding: 5px 10px;
    }
    .tixian .content ul li{
        display: flex;
    }
    .tixian .content ul li span{
        flex: 1;
    }
    .tixian .content ul li span:nth-child(2){
        text-align: center;
    }
    .tixian .content ul li span:nth-child(3){
        text-align: right;
    }
</style>