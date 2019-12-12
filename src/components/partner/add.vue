<template>
    <div class="addPartner" @click="showChange">
        <back :to="1"></back>
        <div class="utype">
            <span class="level">我的级别:{{my_msg.type_name}}</span>
            <span v-show="my_msg.profit_percent">|分成比例：{{my_msg.profit_percent}}</span>
        </div>
        <div class="inputs">
            <ul>
                <li><span>手机号码：</span><input type="text" maxlength="11" placeholder="请输入手机号码" v-model="phone"></li>
                <li><span>姓名：</span><input type="text" placeholder="请输入姓名" maxlength="10" v-model="name"></li>
                <li><span>性别：</span>
                    <label>男<input type="radio" @click="getSex('男')" name="sex" value="男" checked></label>
                    <label>女<input type="radio" @click="getSex('女')" name="sex" value="女"></label>
                </li>
                <li><span>级别：</span><input type="text" placeholder="请选择级别" readonly="readonly" v-model="cls"><i @click.stop="changeClass">选择</i></li>
                <li><span>分成比例：</span><input type="text" placeholder="请输入1~100的数字" maxlength="3" v-model="percent"></li>
            </ul>
        </div>
        <button class="add" @click="add">确定</button>
        <scroll-picker
                :maps="maps"
                :map.sync="map"
                :show="showTab"
                v-on:showChange="showChange"
        ></scroll-picker>
    </div>
</template>

<script>
    import ScrollPicker from "@/base/scroll-pick"
    import Back from "@/base/back"
    export default {
        data(){
            return{
                my_msg:{},
                showTab:false,
                phone:"",
                name:"",
                sex:"男",
                percent:"",
                maps:[],
                map:"",
                cls:"",//设置的级别
                type:""//类型列表
            }
        },
        components:{
            Back,
            ScrollPicker
        },
        methods:{
            changeClass(){
                this.showTab=true;//tab弹出
            },
            showChange(a){
                this.showTab=false;
				if(a !== this.map){
					this.cls = this.map;
				}
            },
            add(){
                let that = this;
                let $app = this.$app;
                let gender;
                if(this.sex=="男"){
                    gender = 1
                }else{
                    gender = 2
                }
                let typeKey;//需要把值转换成对应的键
                for(let key in this.type){
                    if(this.type[key] == this.cls){
                        typeKey = key
                        break
                    }
                }
                let parmas = {
                    mobile:that.phone,
                    admin_name:that.name,
                    type:typeKey,
                    gender:gender,
                    profit_percent:that.percent
                }
                $app.loading("loading")
                $app.ajax("distributor/index/add",parmas,(res)=>{
                    $app.loadHide()
                    if(res.errorCode == 0){
                        $app.toast(res.msg)
                        setTimeout(()=>{
                            this.$router.push("/partner/list")
                        },1000)
                    }else{
                        $app.toast(res.msg)
                    }
                })
            },
            getSex(a){
                this.sex = a;
            }
        },
        mounted(){
            let $app = this.$app;
            let id = $app.getCookie("admin_id");
            $app.ajax("distributor/index/currentAdmin",{admin_id:id},(res)=>{
                this.my_msg = res.data
            });
            $app.ajax("distributor/index/getType",{},(res)=>{
                let arr = Object.values(res.data);//把传入的对象转换为数组
                this.maps = arr;
                this.type = res.data;//保存用于判断的对象的键
                this.map = this.maps[0]
                this.cls = this.map;
            })
        }
    }
</script>

<style scoped>
    .addPartner{
        padding:  0 20px;
    }
    .addPartner .utype{
        padding: 20px 0;
        margin-top: 50px;
        font-size: 17px;
        font-weight: 300;
    }
    .addPartner .inputs li{
        padding: 10px 5px;
        border-bottom: 1px solid  #E5E5E5;
    }
    .addPartner .inputs li:nth-child(3) label{
        margin-left: 20px;
    }
    .addPartner .inputs li:nth-child(4) input{
        width: 120px;
    }
    .addPartner .inputs span{
        display: inline-block;
        width: 70px;
        text-align: right;
        margin:0 10px;
    }
    .addPartner .inputs i{
        display: inline-block;
        width: 50px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: white;
        background: #0078FF;
        border-radius: 3px;
    }
    .addPartner .add{
        margin: 40px auto;
        display: block;
        width: 180px;
        height: 40px;
        background: #0078FF;
        color: white;
        border-radius: 25px;
    }
</style>