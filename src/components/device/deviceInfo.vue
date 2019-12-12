<template>
    <div class="device-info">
        <back></back>
        <div style="height: 50px"></div>
        <header>
            <ul>
                <li>设备序号：{{msg.dryer_sn}}</li>
                <li>设备类型：{{msg.type_name}}</li>
                <li>部署时间：{{msg.add_time}}</li>
            </ul>
            <button class="init" @click="init">次数清零</button>
            <button class="cancel" @click="cancel">撤销部署</button>
        </header>
        <nav>
            <ul>
                <li>设备信息</li>
                <li>网点名称：{{msg.hotel_name}}</li>
                <li>网点类型：{{msg.hotel_type_name}}</li>
                <!--<li>联系电话：</li>-->
                <li>部署代理：{{msg.admin_name}}</li>
                <li>设备地址：{{msg.address}}</li>
            </ul>
        </nav>
        <div class="buttom">
            <h3>收费标准</h3>
            <li v-for="item in list">
                <i class="icon"></i>
                {{item.time}}小时
                <span class="price">价格：{{item.price}}元</span>
                <!--<span class="use">使用</span>-->
            </li>
        </div>
    </div>
</template>

<script>
    import Back from "@/base/back"
    export default {
        name: "deviceInfo",
        data(){
            return{
                msg:"",
                list:[]
            }
        },
        components:{
            Back
        },
        methods:{
			cancel(){
				let that = this;
				let $app = this.$app;
				$app.ajax("device/dryer/removeDryer",{dryer_sn:this.msg.dryer_sn},(res)=>{
					$app.toast(res.msg)
					that.$router.push("/place/list")
				})
			},
            init(){
                let that = this;
                let $app = this.$app;
                $app.ajax("device/dryer/initTimes",{dryer_id:this.msg.dryer_id},(res)=>{
                    $app.toast(res.msg)
                })
            }
        },
        mounted(){
            let that = this;
            let $app = this.$app;
            let dryer_sn = this.$route.query.dryer_sn
            $app.ajax("device/dryer/getDryerInfo",{dryer_sn},(res)=>{
                    this.msg = res.data;
                    this.list = res.data.mode
            })
        }
    }
</script>

<style scoped>
    .device-info{
        padding: 0 10px;
    }
    .device-info header{
        color: white;
        position: relative;
        padding:10px 15px;
        background: #0090FF;
        border-radius: 10px;
        box-shadow: 0 0 10px #dddddd;

    }
    .device-info header li{
        padding: 5px 0;
    }
    .device-info header .cancel{
        position: absolute;
        padding: 5px 10px;
        background: #0090FF;
        bottom: 20px;
        right: 10px;
        border: 1px solid white;
        color: white;
        border-radius: 15px;
    }
    .device-info header .init{
        position: absolute;
        padding: 5px 10px;
        background: #0090FF;
        top: 10px;
        right: 10px;
        border: 1px solid white;
        color: white;
        border-radius: 15px;
    }
    .device-info nav{
        margin-top: 10px;
        border-radius: 10px;
        padding: 10px 15px;
        box-shadow: 0 0 10px #dddddd;
    }
    .device-info nav li:first-child{
        font-size: 17px;
    }
    .device-info nav li{
        padding: 3px 0 ;
    }
    .device-info .buttom{
        margin-top: 10px;
        padding: 10px 15px;
        box-shadow: 0 0 10px #dddddd;
        border-radius: 10px;
    }
    .device-info .buttom h3{
        font-weight: normal;
        font-size: 17px;
    }
    .device-info .buttom li{
        position: relative;
        padding: 3px 0 3px 20px;
    }
    .device-info .buttom .icon{
        width: 16px;
        height: 16px;
        position: absolute;
        background: url("../../assets/image/icon/shizhong.png");
        background-size: cover;
        top: 4px;
        left: 2px;
    }
    .device-info .buttom .price {
        margin-left: 20px;
    }
    .device-info .buttom .use{
        float: right;
        color: #0090FF;
    }
</style>