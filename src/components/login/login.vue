<template>
    <div class="login">
        <div class="title">
            <p v-show="isLogin">
                当前登陆中，如果登陆将记住密码！
                <br>
                如果无需请退出公众号重进
            </p>
        </div>
        <div class="input">
            <h2>账号</h2>
            <input type="text" placeholder="请输入您的手机号码"  v-model="mobile">
            <h2>密码</h2>
            <input type="password" placeholder="请输入密码，注意区分大小写！"  v-model="password">
        </div>
        <div @click="login" class="denglu">确定</div>
        <div class="message">
            <ul>
                <li>忘记密码</li>
                <li class="reset" @click="toReset">重置密码</li>
                <!--<li class="history">登陆历史</li>-->
            </ul>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from "vuex"
    import { Toast } from "vux"
    export default {
        data(){
            return{
                mobile:"",
                password:"",
                isLogin:false
            }
        },
        mounted(){//模块安装完成
        this.getCookie()
            if(sessionStorage.getItem("admin-id")){
                this.isLogin = true;
            }
        },
        methods:{
            submitForm(formName) {
                         const self = this;
                        //判断复选框是否被勾选 勾选则调用配置cookie方法
                        // if (self.checked == true) {
                            console.log("checked == true");
                            //传入账号名，密码，和保存天数3个参数
                            self.setCookie(self.mobile, self.password, 7);
                        // }else {
                        //   console.log("清空Cookie");
                          //清空Cookie
                        //   self.clearCookie();
                        // }
                        
                        //与后端请求代码，本功能不需要与后台交互所以省略
                        
                        console.log("登陆成功");
            },

//设置cookie
            setCookie(c_name, c_pwd, exdays) {
                var exdate = new Date(); //获取时间
                exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
                //字符串拼接cookie
                window.document.cookie = "userName" + "=" + c_name +','+c_pwd+ ";path=/;expires=" + exdate.toGMTString();
            },
//读取cookie
            getCookie: function() {
                if (document.cookie.length > 0) {
                    var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
                    for (var i = 0; i < arr.length; i++) {
                        var arr2 = arr[i].split('='); //再次切割
                        console.log(arr2)
                  
                        var mobile = arr2[1].substring(0,arr2[1].lastIndexOf(','));
                        var password = arr2[1].substring(arr2[1].lastIndexOf(',')+1);
                        console.log(mobile,"开始",password)
                        this.mobile = mobile;
                        this.password = password;
                    }
                }
            },
 //清除cookie
            clearCookie: function() {
                this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
            },
            
            toReset(){
                this.$router.push("/reset")
            },
            login(){
                
                let that = this;
                let $app = that.$app;
                let mobile = that.mobile;
                let password = that.password;
                if (this.mobile === '' || this.password === '') {
                    this.$vux.toast.text('账号密码不能为空', 'middle')
                } else {
                    let params = {
                        mobile,
                        password
                    };
                        $app.ajax("common/login/index",params,(res)=>{
                            if(res.errorCode == 1){
                                this.$vux.toast.text(res.msg, 'middle');
                            }else{
                                this.$vux.toast.text(res.msg, 'middle');
                                $app.setSettings(parseInt(res.data),"admin_id");//本地设置
                                that.$router.push("/home")
                                this.submitForm()
                            }
                        },(err)=>{
                            
                        })

                    }
            },
            ...mapMutations
        },
        components:{
            Toast
        }
    }
</script>

<style scoped>
    @import "~@/assets/css/login.css";
    @import "~@/assets/css/base.css";

</style>