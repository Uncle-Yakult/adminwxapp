<template>
    <div class="pwd">
        <back></back>
        <ul>
            <li>
                <p>旧密码</p>
                <input type="password" placeholder="请输入密码，注意区分大小写！" v-model="old_pw">
            </li>
            <li>
                <p>新密码</p>
                <input type="password" placeholder="请输入密码，注意区分大小写！" v-model="new_pw">
            </li>
            <li>
                <p>重新输入新密码</p>
                <input type="password" placeholder="请输入密码，注意区分大小写！" v-model="new_pw_repeat">
            </li>
        </ul>
        <div class="tijiao" @click="confirm">确定</div>
    </div>
</template>

<script>
    import Back from "@/base/back"
    export default {//重置密码
        data(){
            return{
                old_pw:"",
                new_pw:"",
                new_pw_repeat:''
            }
        },
        components:{
            Back
        },
        methods:{
            confirm(){
                let that = this;
                let $app = this.$app;
                let admin_id = $app.getSettings("admin_id");
                let params = {
                    admin_id,
                    old_password:this.old_pw,
                    new_password:this.new_pw,
                    new_password_repeat:this.new_pw_repeat
                };

                $app.ajax("distributor/index/resetPassword",params,(res)=>{
                    if(res.errorCode == 1){
                        this.$vux.toast.text(res.msg, 'middle');
                        this.old_pw = "";
                        this.new_pw = "";
                        this.new_pw_repeat = ""
                    }else{
                        this.$vux.toast.text(res.msg, 'middle');
                        this.$router.push("/my")
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .pwd{
        padding: 100px 20px 0;
    }
    .pwd .tijiao{
        font-size: 15px;
        width: 56%;
        margin: 30px auto;
        height: 44px;
        line-height: 44px;
        border-radius: 22px;
        background: #0078FF;
        color: white;
        text-align: center;
    }
    .pwd p{
        font-size: 18px;
        font-weight: 500;
        padding-bottom: 15px;
        color: #353f49;
    }
    .pwd ul input{
        width: 100%;
        border-bottom: 1px solid #F7F7F7;
        padding: 5px;
        margin-bottom: 10px;
    }
</style>