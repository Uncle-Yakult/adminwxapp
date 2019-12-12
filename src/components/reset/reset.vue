<template>
    <div class="reset">
        <back></back>
        <div class="content">
            <h2>验证手机</h2>
            <input type="text" placeholder="请输入您的手机号码" v-model="phone">
            <button @click="huoqu">获取验证码</button>
            <div class="message">
                <ul>
                    <li>已有账号?</li>
                    <li class="tologin" @click="toLogin">去登录</li>
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
               phone:""
            }
        },
        components:{
            Back
        },
        methods:{
            toLogin(){
                this.$router.push("/login")
            },
            huoqu(){

            }
        }

    }
</script>

<style scoped>
    .content{
        margin: 40% 30px 0;
    }
    .content h2{
        margin-top: 20px;
        font-size: 24px;
    }
    .content input{
        margin-top: 20px;
        width: 80%;
        padding: 15px 0;
        border-bottom: 1px solid #ccc;
    }
    .content button{
        display: block;
        width: 70%;
        height: 44px;
        line-height: 44px;
        font-size: 15px;
        margin: 30px auto;
        color: white;
        background:#0078FF;
        border-radius: 15px;
    }
    .message{
        margin-left: 30%;
    }
    .message li{
        float: left;
        font-size: 12px;
    }
    .tologin{
        color: #0090FF;
    }
</style>