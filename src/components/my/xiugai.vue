<template>
    <div class="my-info">
        <back></back>
        <div class="main">
            <ul>
                <li><span>用户名称</span><span class="middle">{{admin_name}}</span><span class="xiugai" @click="xiugai">修改</span></li>
                <li><span>用户性别</span><span class="middle">{{gender}}</span><span></span></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import Back from "@/base/back"
    export default {//修改个人资料
        data(){
            return{
                admin_name:"",
                gender:"男"
            }
        },
        components:{
            Back
        },
        methods:{
            xiugai(){
                let that = this;
                var $app = this.$app;
                var admin_id = $app.getSettings("admin_id");
                this.$prompt('', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    message:"修改为",
                    customClass: 'messageBox-prompt-test'
                }).then(({ value }) => {
                    this.admin_name = value;
                    console.log(admin_id)
                    $app.ajax('distributor/index/edit',{admin_id:admin_id,admin_name:value},(res)=>{
                        console.log(res)
                    })
                }).catch(() => {

                });
            }
        },
        mounted(){
            let that = this;
            let $app = this.$app;
            var admin_id = $app.getSettings("admin_id");
            console.log(admin_id)
            $app.ajax('distributor/index/detail',{admin_id:admin_id},(res)=>{
                that.admin_name = res.data.admin_name;
                if(res.data.gender == 1 ){
                    this.gender = "男"
                }else{
                    this.gender = "女"
                }
            })
        }
    }
</script>

<style scoped>
    .my-info{
        padding-top: 50px;
    }
    .my-info ul li{
        display: flex;
        line-height: 30px;
        margin-bottom: 10px;
    }
    .my-info ul li span{
        flex: 1;
    }
    .my-info ul li span.middle{
        flex: 2;
        border:1px solid #e3e3e3;
        border-radius: 15px;
        text-indent: 2em;
        margin-right: 5px;
    }
    .my-info .main{
        padding: 15px 25px;
    }
    .my-info ul li span.xiugai{
        background: #0078FF;
        color: white;
        border-radius:15px ;
        text-align: center;
    }
</style>