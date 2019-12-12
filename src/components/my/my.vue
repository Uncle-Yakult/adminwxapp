<template>
    <div class="my">
        <div class="top">
            <div class="left">
                <img :src="msg.avatar==null||msg.avatar==''?common:msg.avatar" alt="">
            </div>
            <div class="right">
                <p class="name">{{msg.admin_name}}</p>
                <p class="id">ID:{{msg.admin_id}}</p>
                <p class="id">手机号：{{msg.mobile}}</p>
                <p class="edit" @click="toEdit"><i class="icon"></i>编辑</p>
            </div>
        </div>
        <div class="middle">
            <p class="title">可提现金额（元）</p>
            <p class="money">{{msg.able_cash_out_amount}}<span class="tixian" @click="totixian">申请提现</span></p>
            <ul>
                <li>待审核金额<br/><span>{{msg.verifying_amount}}元</span></li>
                <li>已提现金额<br/><span>{{msg.cash_out_amount}}元</span></li>
                <li>总分成金额<br/><span>{{msg.profit_amount}}元</span></li>
            </ul>
        </div>
        <div class="bottom">
            <ul>
                <!--<li @click="toLogs"><i class="icon"></i>分成记录<span class="arrow"></span></li>-->
                <li @click="pwd"><i class="icon"></i>修改密码<span class="arrow"></span></li>
                <li @click="toAdd"><i class="icon"></i>添加收款二维码<span class="arrow"></span></li>
                <!--<li><i class="icon"></i>切换项目<span class="arrow"></span></li>-->
                <li @click="toLogin"><i class="icon"></i>其他账号登陆<span class="arrow"></span></li>
                <li @click="toPersonSet"><i class="icon"></i>个人设置<span class="arrow"></span></li>
            </ul>
        </div>
        <div style="height: 55px;"></div>
        <tab></tab>
    </div>
</template>

<script>
    import Tab from "@/base/tab"
    export default {
        data(){
            return{
                msg:"",
                common:require("../../assets/image/2.png")
            }
        },
        methods:{
            pwd(){
                this.$router.push("/my/pwd")
            },
            toLogs(){
                this.$router.push("/my/logs")
            },
            toAdd(){
                this.$router.push("/my/qrcode")
            },
            toLogin(){
                this.$router.push("/login")
            },
            toEdit(){
                this.$router.push("/my/xiugai")
            },
            totixian(){
                this.$router.push("/my/tixian")
            },
            toPersonSet(){
                this.$router.push("/my/person_set")
            }
        },
        components:{
            Tab
        },
        mounted(){
            let that = this;
            let $app = this.$app;
            let admin_id = $app.getSettings("admin_id");
            console.log(admin_id);
            $app.ajax("distributor/index/currentAdmin",{admin_id},(res)=>{
                this.msg = res.data
            })
        }
    }
</script>

<style scoped>
    .my{
        background: #e3e3e3;
        height: 100%;
    }
    .my .top{
        display: flex;
        height: 174px;
        padding: 20px;
        box-sizing: border-box;
        background: -webkit-linear-gradient(top, rgb(64,222,255), rgb(1,115,255))
    }
    .my .top img{
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    .my .top .left{
        flex: 2;
    }
    .my .top .right{
        flex: 7;
        color: white;
        position: relative;
        margin-left: 20px;
    }
    .my .top .right .name{
        padding-top: 8px;
        font-size: 17px;
        font-weight: 500;
    }
    .my .top .right .id{
        font-size: 14px;
        font-weight: 500;
    }
    .my .top .right .edit{
        width: 50px;
        height: 30px;
        position: absolute;
        top: 15px;
        right: 15px;
    }
    .my .top .right i{
        width: 20px;
        height: 20px;
        display: block;
        float: left;
        background: url("../../assets/image/edit.png");
        background-size:20px 20px  ;
    }
    .my .middle{
        width: 90%;
        background: white;
        border-radius: 10px;
        padding: 15px;
        position: absolute;
        top: 100px;
        left: 5%;
        box-sizing: border-box;
    }
    .my .middle .title{
        color: #63707c;
        margin-bottom: 8px;
    }
    .my .middle .money{
        font-size: 26px;
        color: #0078FF;
        font-weight: 500;
        height: 30px;
        line-height: 30px;
        margin-bottom: 8px;
    }
    .my .tixian{
        float: right;
        border:1px solid #0078FF;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 400;
        text-align: center;
        width: 70px;
        line-height: 25px;
    }
    .my .middle ul{
        display: flex;
        text-align: center;
        color: #8f8f94;
    }
    .my .middle ul li{
        float: left;
        flex: 1;
    }
    .my .middle ul li:nth-child(2) {
        border-right: 1px solid #8f8f94;
        border-left: 1px solid #8f8f94;
    }
    .my .middle ul li span {
        color: #ff0a00;
    }
    .my .bottom{
        margin-top: 70px;
        background: white;
        padding-bottom: 10px;
    }
    .my .bottom ul{
        padding: 0 25px;
    }
    .my .bottom li{
        position: relative;
        padding: 15px 20px;
        border-bottom: 1px solid #cccccc;
    }
    .my .bottom .icon{
        position: absolute;
        left: 2px;
        top: 20px;
        width: 10px;
        height: 10px;
        background: #e1e1e1;
        transform: rotate(45deg);
    }
    .my .bottom .arrow{
        position: absolute;
        right: 0;
        top: 20px;
        width: 10px;
        height: 10px;
        border: 2px solid transparent;
        border-radius: 1.5px;
        border-right-color: #e1e1e1;
        border-top-color: #e1e1e1;
        transform: rotate(45deg);
    }
</style>