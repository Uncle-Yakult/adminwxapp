<template>
    <div class="editPlace" @click="showChange">
        <back></back>
        <div class="img-box">
            <input type="file" id="img" @change="getVal" accept="image/png, image/jpeg, image/gif, image/jpg">
            <img :src="msg.images==null||msg.images==''?common:msg.images" alt="">
        </div>
        <ul class="inputs">
            <li><span>网点名称</span><input type="text" v-model="msg.hotel_name"></li>
            <li><span>网点类型</span><span>{{msg.type_name}}</span><button @click.stop="changeType">选择<i></i></button></li>
            <li><span> 代理商</span><span>{{msg.admin_name}}</span><button @click.stop="changeAgent">选择</button></li>
            <li><span>网点地址</span><textarea v-model="msg.address"></textarea></li>
            <li><span>网点描述</span><textarea v-model="msg.description"></textarea></li>
            <li><button class="save" @click="save">保存</button></li>
        </ul>
        <scroll-picker
                :maps="maps"
                :map.sync="map"
                :show="showTab"
                v-on:showChange="showChange"
        ></scroll-picker>
        <div class="dls-chooseBox" v-show="isChoose">
            <div class="top">
                <div :class="chooseType==1?'active':''" @click="changedls(1)">全部代理</div>
                <div :class="chooseType==2?'active':''" @click="changedls(2)">下级代理</div>
            </div>
            <div class="middle">
                <span class="icon el-icon-search"></span>
                <span class="icon el-icon-arrow-down"></span>
                <input type="text" placeholder="请输入搜索内容" v-model="search_dls">
                <select ref="selectType" @change="showValue">
                    <option value="0">全部</option>
                    <option value="1">业务员</option>
                    <option value="2">商户</option>
                </select>
            </div>
            <div class="bottom">
                <ul class="item">
                    <li @click="close(item.admin_id,item.admin_name)" v-for="item in list">
                        <input type="radio" name="dls-name">
                        <span class="name">{{item.admin_name}}</span>
                        <span>手机号:{{item.mobile}}</span>
                    </li>
                </ul>
            </div>
            <div class="close" @click="close">
                关闭
            </div>
            <div class="other" v-show="!have">
                没有查找到你搜索的内容
            </div>
        </div>
    </div>
</template>

<script>
    import ScrollPicker from "@/base/scroll-pick"
    import Back from "@/base/back"
    export default {
        data(){
            return{
                common:require("../../assets/image/ban.png"),
                showTab:false,
                maps:[],
                map:"",
                msg:{},
                isChoose:false,//设置是否显示选择框
                list:[],//选择代理商列表
                dls:"",//代理商id
                HotelTypeList:[],//全部网点类型的表
                have:true,//是否有这个类型的代理商
                chooseType:1,//选择代理类型，默认为1（全部）
                search_dls:""
            }
        },
        components:{
            Back,
            ScrollPicker
        },
        methods:{
            getVal(e){//获得图片的base64码
                var file = e.target.files[0]
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    this.$vux.toast.text('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种', 'middle')
                    return false
                }
                var reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = (e) => {
                    this.msg.images= e.target.result//转换成base64的图片
                }
            },
            showValue(){//获取下拉选框的值
                let index = parseInt(this.$refs.deciveModeId.value);//获取了相应的value值
            },
            close(a,b){//关闭选择代理商框
                if(a&&b){
                    this.dls = a;
                    this.isChoose = false;
                    this.msg.type_name = b
                }
                this.isChoose = false
            },
            showChange(a){//关闭scroll-pick，并把所选择的值设置，需要转换为相应的键
                this.showTab=false;
                this.msg.type_name = this.map
            },
            changeType(){//点击，弹出scroll-pick
                this.showTab = true;
            },
            changeAgent(){//改变代理商，显示选框
                this.isChoose = true
            },
            changedls(a){//改变代理类型（全部，下级）
                let $app = this.$app;
                this.chooseType = a
                if(a == 1){
                    $app.ajax("hotel/index/getAllDistributors",{},(res)=>{
                        if(res.data == null){
                            this.have = false;
                            this.list = res.data
                        }
                        this.list = res.data
                    })
                }else{
                    $app.ajax("hotel/index/getChildDistributors",{},(res)=>{
                        if(res.data == null){
                            this.have = false;
                            this.list = res.data
                        }
                        this.list = res.data
                    })
                }
            },
            save(){//提交保存
                let that = this;
                let $app = that.$app;
                let typeKey;
                let hotel_id = this.$route.query.id;
                for(let key in this.HotelTypeList){
                    if(this.HotelTypeList[key] == this.msg.type_name){
                        typeKey = key;
                        break
                    }
                }
                let params = {
                    hotel_name:this.msg.hotel_name,
                    type:typeKey,
                    admin_id:this.msg.admin_id,
                    address:this.msg.address,
                    description:this.msg.description,
                    images:this.msg.images
                }
                $app.ajax("hotel/index/edit&hotel_id="+hotel_id,params,(res)=>{
                    if(res.errorCode == 0){
                        this.$router.push("/place/list")
                    }else{
                        this.$vux.toast.text(res.msg, 'middle');
                    }
                })
            },
        },
        mounted(){
            let $app = this.$app;
            let hotel_id = this.$route.query.id;
            $app.ajax("hotel/index/edit&hotel_id="+hotel_id,{},(res)=>{//根据list页点击的传入的id
                this.msg = res.data
            },(err)=>{

            },"GET");
            $app.ajax("hotel/index/getAllDistributors",{},(res)=>{//获取全部代理
                this.list = res.data
            })
        },
        created(){
            let $app = this.$app
            $app.ajax("hotel/index/getHotelType",{},(res)=>{//初始请求网点类型表
                this.HotelTypeList = res.data;//判断键的列表
                let arr = Object.values(res.data)
                this.maps = arr;
                this.map = this.maps[0];//初始选值，在没有记录是默认第一个
            });
        },
        watch:{
            search_dls(a){//输入搜索关键字时
                let $app = this.$app;
                let params = {
                    content:a,
                    is_all:1
                }
                $app.ajax("hotel/index/searchAdmin",params,(res)=>{
                    if(res.data == null){
                        this.have = false;
                        this.list = []
                    }else{
                        this.list = res.data;
                        this.have = true
                    }
                })
            }
        }
    }
</script>

<style scoped>
   @import "~@/assets/css/editPlace.css";
   .editPlace .inputs li:last-child{
       border: none;
       margin-top: 10px;
   }
   .editPlace .dls-chooseBox{
       position: fixed;
       top:0;
       left: 0;
       width: 100%;
       height: 100%;
       background: white;
       z-index: 10;
       padding-top:5px;
   }
   .editPlace .dls-chooseBox .top{
       display: flex;
       border: 1px solid #dddddd;
       margin: 0 8px;
       border-radius: 3px;
   }
   .editPlace .dls-chooseBox .top div{
       flex: 1;
       height: 35px;
       text-align: center;
       line-height: 35px;
       font-size: 15px;
   }
   .editPlace .dls-chooseBox .middle {
       padding: 8px;
       display: flex;
       position: relative;
       height: 30px;
   }
   .editPlace .dls-chooseBox .middle input{
       flex: 3;
       border: 1px solid #dddddd;
       margin-right: 10px;
       text-indent: 2em;
       border-radius: 20px;
   }
   .editPlace .dls-chooseBox .middle select{
       flex: 1.5;
   }
   .editPlace .dls-chooseBox .middle select option{
       height: 30px;
   }
   .editPlace .dls-chooseBox .middle .icon{
       position: absolute;
       top: 15px;
   }
   .editPlace .dls-chooseBox .middle .icon:first-child {
       left: 18px;
   }
   .editPlace .dls-chooseBox .middle .icon:nth-child(2) {
       right: 20px;
   }
   .editPlace .dls-chooseBox .bottom{
       padding: 3px 8px 0;
       border-top: 1px solid #ccc;
   }
   .editPlace .dls-chooseBox .bottom li{
       padding-left: 10px;
       line-height: 40px;
       border-bottom: 1px solid #e3e3e3;
       overflow: hidden;
       text-align: left;
       font-size: 14px;
       padding:10px 0;
       box-shadow: 0 1px 3px #eee;
   }
   input[type="radio"]{
       margin: 0 10px;
   }
   .editPlace .dls-chooseBox .bottom li .name{
       width: 100px;
       display: inline-block;
   }
   .editPlace .close{
       position: fixed;
       bottom: 0;
       left: 0;
       width: 100%;
       height: 40px;
       line-height: 40px;
       color: #0090FF;
       border-top: 1px solid #ccc;
       text-align: center;
       font-size: 15px;
   }
   .editPlace .other{
       text-align: center;
       font-size: 15px;
       line-height: 40px;
   }
</style>