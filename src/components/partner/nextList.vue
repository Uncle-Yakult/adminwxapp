<template>
    <div class="nextList">
        <back :to="1"></back>
        <div class="next">下级代理：{{num}}人</div>
        <div class="header">
            <ul>
                <li><img src="../../assets/image/ban.png" alt=""></li>
                <li>{{msg.type_name}}：{{msg.admin_name}}</li>
                <li>
                    入驻时间：{{msg.add_date}}
                </li>
            </ul>
        </div>
        <nodata-view :show="!have"></nodata-view>
        <div class="list">
            <div class="list-item" v-for="item in list">
                <div class="arrow"></div>
                <div class="top clearfix" @click="toDetail(item.admin_id)">
                    <img :src="item.images==null?'common':'item.images'" alt="" class="fl">
                    <div class="right fl">
                        <p>{{item.admin_name}}</p>
                        <p><span>[{{item.type_name}}]</span>总分成：{{item.profit_percent}}</p>
                        <p>总收入：{{item.profit_amount}}元</p>
                    </div>
                </div>
                <ul class="bottom">
                    <li @click="toNextList(item.admin_id)">代理(0)</li>
                    <li>设备(0)</li>
                    <li>网点(0)</li>
                    <li @click="toEdit(item.admin_id)">编辑</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import NodataView from "@/base/nodata-view"
    import Back from "@/base/back"
    export default {
        name: "nextList",
        data(){
          return{
              msg:"",
              list:{},
              have:false,
              num:0,
              common:require("../../assets/image/ban.png")
          }
        },
        components:{
            Back,
            NodataView
        },
        methods:{
            toDetail(a){
                //进入详情
                this.$router.push({
                    path: "/partner/detail",
                    query: {
                        id: a
                    }
                })
            },
            toEdit(a){
                //进入编辑
                this.$router.push({path:"/partner/edit",
                    query: {
                        id: a
                    }})
            },
            toNextList(a){
                //进入下一级的代理列表
                let that = this;
                let $app = this.$app;
                $app.ajax("distributor/index/getChildList",{admin_id:a},(res)=>{
                    if(res.data == ""){
                        this.list = "";
                        this.have = false;
                        this.num = 0
                    }else{
                        this.list = res.data;
                        this.have = true;
                        this.num = res.data.length
                    }
                });
                $app.ajax("distributor/index/currentAdmin",{admin_id:a},(res)=>{
                    this.msg = res.data
                })
            }
        },
        mounted(){
            let that = this;
            let $app = this.$app;
            let id = this.$route.query.id;
            $app.ajax("distributor/index/getChildList",{admin_id:id},(res)=>{
                //一级数据
                if(res.data == null||res.data == ""){
                    this.have = false;
                    this.num = 0
                }else{
                    that.list = res.data;
                    this.have = true;
                    this.num = res.data.length
                }
            });
            $app.ajax("distributor/index/currentAdmin",{admin_id:id},(res)=>{
                this.msg = res.data
            })
        }
    }
</script>

<style scoped>
    .nextList{
        padding: 50px 0 0px 0 ;
        background: #F7F7F7;
    }
    .nextList .header{
        margin: 0 10px;
        font-size: 14px;
        padding: 20px;
        text-align: center;
        height: 130px;
        background: #0078FF;
        border-radius: 5px;
        color: white;
    }
    .nextList .header img{
        margin: 0 auto;
        width: 87px;
        height: 87px;
        border-radius: 50%;
        margin-bottom: 5px;
    }
    .nextList .next{
        position: fixed;
        top: 10px;
        right: 0;
        border: 1px solid #0078FF;
        padding: 5px;
        background: white;
        border-right-color: transparent;
        border-radius: 15px 0 0 15px;
    }
    .nextList .list-item{
        padding: 20px;
        margin-top: 10px;
        margin-bottom: 10px;
        background: white;
        position: relative;
        border-bottom: 1px solid #F7F7F7;
    }
    .nextList .list-item .top {
        display: flex;
    }
    .nextList .list-item .right {
        flex: 1;
        margin-left: 10px;
    }
    .nextList .list-item .top img{
        width:60px;
        height: 60px;
    }
    .nextList .list-item .bottom{
        display: flex;
        text-align: center;
    }
    .nextList .list-item span{
        color: #0078FF;
    }
    .nextList .list-item .bottom li{
        float: left;
        margin-top: 10px;
        margin-left:5px;
        height: 30px;
        line-height: 30px;
        border-radius: 5px;
        background: #0078FF;
        color: white;
        flex: 1;
    }
    .nextList .list-item .arrow{
        position: absolute;
        right: 10px;
        top: 40px;
        width: 10px;
        height: 10px;
        border: 2px solid transparent;
        border-radius: 1.5px;
        border-right-color: #e1e1e1;
        border-top-color: #e1e1e1;
        transform: rotate(45deg);
    }
</style>