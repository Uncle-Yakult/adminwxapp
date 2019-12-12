<template>
    <div class="qrcode">
        <back></back>
        <div class="box">
            <div class="main">
                <input type="file" id="img" @change="getVal" accept="image/*">
                <img :src="imgsrc" alt="">
            </div>
            <button v-html="text" @click="confirm"></button>
            <!--<p>如何获取微信收款二维码？<span>查看教程</span></p>-->
        </div>
    </div>
</template>

<script>
    import Back from "@/base/back"
    export default {//添加二维码
        data(){
            return{
                imgsrc:require('../../assets/image/qrcode.png'),
                text:"提交"
            }
        },
        components:{
            Back
        },
        methods:{
            getVal(e){//获得图片的base64码
                let that = this;
                let $app = that.$app;
                var file = e.target.files[0];
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    this.$vux.toast.text('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种', 'middle');
                    return false
                }
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    this.imgsrc= e.target.result;//转换成base64的图片
                }
            },
            confirm(){
                console.log(1)
                if(this.imgsrc==""){
                    this.$vux.toast.text("请选择图片", 'middle');
                    return false
                }
                let $app = this.$app;
                $app.ajax("distributor/index/uploadPaymentQrcode",{payment_qrcode:this.imgsrc},(res)=>{
                    this.$vux.toast.text(res.msg, 'middle');
                })
            }
        },
        mounted(){
            let that = this;
            let $app = this.$app;
            let admin_id = $app.getCookie("admin_id");
            $app.ajax("distributor/index/currentAdmin",{admin_id},(res)=>{
                if(res.data.payment_qrcode==""||res.data.payment_qrcode==null){

                }else{
                    this.imgsrc = res.data.payment_qrcode;
                    this.text = "提交"
                }
            })
        }
    }
</script>

<style scoped>
    .qrcode{
        padding-top: 100px;
    }
    .qrcode div.box{
        text-align: center;
    }
    .qrcode .main{
        width: 204px;
        height: 204px;
        position: relative;
        display: inline-block;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 0 31px 0 rgba(73,73,73,0.2);
    }
    .qrcode .main img{
        width: 204px;
        height: 204px;
    }
    .qrcode button{
        width: 56%;
        margin: 20px auto;
        height: 44px;
        line-height: 44px;
        border-radius: 22px;
        font-size: 15px;
        background: #0078FF;
        color: white;
    }
    .qrcode span{
        color: #0090FF;
    }
    .qrcode input{
        position: absolute;
        top:0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
</style>