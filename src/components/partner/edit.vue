<template>
    <div class="editPartner" @click="showChange">
        <back></back>
        <div class="del" @click="del">删除代理</div>
        <div class="utype">
            <span class="level">我的级别：{{msg.my_type_name}}</span>
            <span class="fc">|分成比例：{{msg.my_profit_percent}}</span>
        </div>
        <div class="message">
            <ul>
                <li><img src="../../assets/image/icon/yonghu.png" alt="">姓名：{{msg.admin_name}}<button @click="changeName">修改姓名</button></li>
                <li><img src="../../assets/image/icon/shouji.png" alt="">手机号：{{msg.mobile}}</li>
                <li><img src="../../assets/image/icon/yonghu.png" alt="">性别：{{msg.gender}}</li>
                <li><img src="../../assets/image/icon/yuanjibie.png" alt="">级别：{{msg.type_name}}
                    <!--<button @click="changeClass">修改级别</button>-->
                </li>
                <li><img src="../../assets/image/icon/80.png" alt="">分成比例：{{msg.profit_percent}}<button @click="changePercent" :class="disable==false?'disable':''" :disable="disable">修改比例</button></li>
                <li><img src="../../assets/image/icon/59.png" alt="">入驻时间：{{msg.add_time}}</li>
            </ul>
        </div>
        <div class="bottom" @click="check">
            确定
        </div>
        <scroll-picker
                :maps="maps"
                :map.sync="map"
                :show="showTab"
                v-on:showChange="showChange"
        ></scroll-picker>
    </div>
</template>

<script>
    import Back from "@/base/back"
    import ScrollPicker from "@/base/scroll-pick"
    import { Toast } from 'vux'
    export default {
        data(){
            return{
                msg:{},
                showTab:false,
                type:"",
                maps:[],
                map:"",
                disable:""
            }
        },
        mounted(){
            let that = this;
            let $app = this.$app;
            let id = this.$route.query.id;
            // let mainid = sessionStorage.getItem("admin-id");
            $app.ajax("distributor/index/getType",{},(res)=>{
                let arr = Object.values(res.data);//把传入的对象转换为数组
                this.maps = arr;
                this.type = res.data;//保存用于判断的对象的键,用户类型表
            })
            $app.ajax("distributor/index/edit&admin_id=" + id,{
				admin_id:id
			},(res)=>{
                this.msg = res.data//直接使用代理编辑接口
                this.map = res.data.type_name;//初始选值
                if(res.data.gender == 1){
                    this.msg.gender = "男"
                }else{
                    this.msg.gender = "女"
                };
                if(res.data.is_allow_edit_profit == true){
                    this.disable = true
                }else{
                    this.disable = disabled
                }
            },(err)=>{},'GET');
        },
        created(){

        },
        methods:{
            changeName(){
                this.$prompt('', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    message:"输入修改的姓名",
                    customClass: 'messageBox-prompt-test'
                }).then(({ value }) => {
                    if(value){
                        this.msg.admin_name = value;
                    }
                }).catch(() => {

                });
            },
            changePercent(){
                this.$prompt('', '', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    message:"请输入0~100的数字",
                    customClass: 'messageBox-prompt-test'
                }).then(({ value }) => {
                    if(value){
                        this.msg.profit_percent = value;
                    }
                }).catch(() => {

                });
            },
            del(){
                let that = this;
                let $app = that.$app;
                this.$confirm('你确定要删除代理吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    customClass: 'messageBox-prompt-test'
                }).then(() => {
                    let id = that.$route.query.id;
                    $app.ajax("distributor/index/delete",{admin_id:id},(res)=>{
                        if(res.errorCode==0){
                            that.$vux.toast.text(res.msg, 'middle');
                            that.$router.push("/partner/list")
                        }else{
                            that.$vux.toast.text(res.msg, 'middle');
                        }
                    })
                }).catch(() => {
                    that.$vux.toast.text("已取消删除", 'middle');
                });
            },
            changeClass(){
                this.showTab=true;//当请求成功是。tab弹出
            },
            showChange(){
                this.showTab=false;
                this.msg.type_name = this.map;
            },
            check(){
                let id = this.$route.query.id;
                let that = this;
                let $app = this.$app;
                let typeKey;
                for(let key in this.type){
                    if(this.type[key] == this.msg.type_name){
                        typeKey = key;
                        break
                    }
                }
                let params = {
                    admin_id:id,
                    type:typeKey,
                    admin_name:this.msg.admin_name,
                    profit_percent:this.msg.profit_percent
                }
                $app.ajax("distributor/index/checkProfitPercent",{profit_percent:that.msg.profit_percent},(res)=>{
                    if(res.errorCode==0){
                        $app.ajax("distributor/index/edit",params,(res)=>{
                            that.$vux.toast.text(res.msg, 'middle')
                            that.$router.push({path:"/partner/list"})
                        })
                    }else{
                        that.$vux.toast.text(res.msg, 'middle')
                    }
                })

            }
        },
       components:{
           Back,
           ScrollPicker,
           Toast
       }
    }
</script>

<style scoped>
    .editPartner{
        padding:  0 20px;
    }
    .editPartner .utype{
        padding: 20px 0;
        margin-top: 50px;
        font-size: 17px;
        font-weight: 300;
    }
    .editPartner .del{
        position: fixed;
        top: 10px;
        right:0;
        width: 75px;
        text-align: center;
        line-height: 30px;
        height: 30px;
        background: red;
        color: white;
        font-size: 13px;
        border-radius: 15px 0 0 15px;
    }
    .editPartner .message li{
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #e7e7e7;
        padding: 10px 0;
    }
    .editPartner .message img{
        width: 20px;
        height: 20px;
        float: left;
        margin: 5px;
    }
    .editPartner .message button{
        float: right;
        width: 70px;
        height: 25px;
        background: #0078FF;
        color: white;
        text-align: center;
        line-height: 25px;
        border-radius: 5px;
        padding: 0;
    }
    button.disable{
        background: #cccccc !important;
    }
    .editPartner .bottom{
        text-align: center;
        width: 70%;
        height: 44px;
        line-height: 44px;
        font-size: 15px;
        margin: 30px auto;
        color: white;
        background:#0078FF;
        border-radius: 15px;
        position: relative;
        z-index: 5;
    }
</style>
<style>
    .messageBox-prompt-test{
        width: 300px !important;
    }
</style>