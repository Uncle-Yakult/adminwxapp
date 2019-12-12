<template>
    <div class="cash-in">
        <back></back>
        <div style="height: 150px"></div>
        <div class="content">
            <ul>
                <li>提现金额</li>
                <li><input type="text" placeholder="0.00元" v-model="cash"></li>
                <li>输入提现金额，提现范围：1~500元</li>
                <li>无手续费</li>
            </ul>
        </div>
        <button @click="confirm">确定</button>
    </div>
</template>

<script>
    import Back from "@/base/back"
    export default {
        data(){
            return{
                cash:""
            }
        },
        components:{
            Back
        },
        methods:{
            confirm(){
                let that = this;
                let $app = this.$app;
                $app.ajax("distributor/index/cashWithdrawApply",{amount:this.cash},(res)=>{
                    if(res.errCode == 1){
                        $app.toast(res.msg)
                        // this.$vux.toast(res.msg,"middle")
                    }else{
                        $app.toast(res.msg)
                        // this.$vux.toast(res.msg,"middle")
                        this.$router.push("/my/tixian")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .cash-in{
        padding: 0 20px;
    }
    .cash-in .content ul li{
        padding: 5px 0;
    }
    .cash-in .content ul li:first-child {
        font-weight: bold;
        font-size: 14px;
    }
    .cash-in .content input {
            font-size: 20px;
        border-bottom: 1px  solid #dddddd;
        padding: 10px 5px;
    }
    .cash-in .content ul li:nth-child(3),
    .cash-in .content ul li:nth-child(4){
        color: #999;
        font-size: 12px;
    }
    .cash-in button{
        display: block;
        margin: 50px auto;
        width: 56%;
        height: 40px;
        line-height: 40px;
        background: #0078FF;
        color: white;
        border-radius: 20px;
    }
</style>