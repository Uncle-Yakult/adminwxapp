<template>
    <div class="partnerList">
        <back :to="1"></back>
        <div class="add" @click="toAdd">
            新增代理
        </div>
        <input type="text" placeholder="搜索" v-model="search" @blur="searchPartner">
        <nodata-view :show="!have"></nodata-view>
        <div class="list-item" v-for="item in list">
            <div class="arrow"></div>
            <div class="top clearfix" @click="toDetailed(item.admin_id)">
                <img :src="item.avatar==null||item.avatar==''?common:item.avater" alt="" class="fl">
                <div class="right fl">
                    <p>{{item.admin_name}}</p>
                    <p><span>[{{item.type_name}}]</span>可分配比例：{{item.profit_percent}}</p>
                    <p>总收入：{{item.profit_amount}}元</p>
                </div>
            </div>
            <ul class="bottom">
                <li @click="toNextList(item.admin_id)">代理({{item.count_childs}})</li>
                <li @click="toNextDevices(item.admin_id)">设备({{item.count_devices}})</li>
                <li @click="toNextPlace(item.admin_id)">网点({{item.count_hotels}})</li>
                <li @click="toEdit(item.admin_id)">编辑</li>
            </ul>
        </div>
    </div>
</template>

<script>
    import NodataView from "@/base/nodata-view"
    import Back from "@/base/back"
    export default {
        data(){
          return{
              list:[],
              have:false,
              search:"",
              common:require('../../assets/image/ban.png')
          }
        },
        methods:{
            toAdd(){
                this.$router.push({path:"/partner/add"})
            },
            toEdit(admin_id){//进入编辑下级代理页面
                this.$router.push({path:"/partner/edit",
                    query:{
                        id:admin_id
                    }
                })
            },
            toDetailed(admin_id){//进入下级代理详情页
                this.$router.push({path:"/partner/detail",
                    query:{
                        id:admin_id
                    }
                })
            },
            toNextList(admin_id){//进入下一级的代理列表
                this.$router.push({path:"/partner/nextlist",
                    query: {
                        id: admin_id
                    }})
            },
            toNextDevices(a){//进入下一级的设备列表
                this.$router.push({path:"/partner/nextdevices",
                    query: {
                        id: a
                    }})
            },
            toNextPlace(a){
                this.$router.push({path:"/nextplace",
                    query:{
                        id:a
                    }
                })
            },
            searchPartner(){
                let $app = this.$app;
                if(this.search){
                    //有内容则搜索，无则加载全部
                    $app.ajax("distributor/index/getChildListByFuzzy",{param:this.search},(res)=>{
                        if(res.data){
                            this.list = res.data;
                            this.have = true;
                        }else{
                            this.have = false;
                        }
                    })
                }else{
                    let id = $app.getCookie("admin_id");
                    $app.ajax("distributor/index/getChildList",{
                        id
                    },(res)=>{
                        this.list = res.data;
                        this.have=true;
                    });
                }
            }
        },
        components:{
            Back,
            NodataView
        },
        mounted(){
            let that = this;
            let $app = that.$app;
            let id = sessionStorage.getItem("admin-id");
            $app.ajax("distributor/index/getChildList",{
				id
			},(res)=>{
                this.list = res.data;
                this.have=true;
            });
        }
    }
</script>

<style scoped>
    .partnerList{
        /*background: #F9F9F8;*/
        padding-top: 50px;
    }
    .partnerList .add{
        width: 80px;
        height: 30px;
        border: 1px solid #0078FF;
        text-align: center;
        background: white;
        line-height: 30px;
        border-radius: 15px 0 0 15px;
        border-right: none;
        position: fixed;
        top: 10px;
        right: 0;
        z-index: 5;
    }
    .partnerList input{
        display: block;
        margin: 0 auto;
        text-align: center;
        border: 1px solid black;
        border-radius: 10px;
        height: 30px;
        width: 90%;
    }
    .partnerList .list-item{
        padding: 20px;
        margin: 5px 0;
        background: white;
        position: relative;
        border-bottom: 1px solid #F7F7F7;
    }
    .partnerList .list-item .top {
        display: flex;
    }
    .partnerList .list-item .right {
        flex: 1;
        margin-left: 10px;
    }
    .partnerList .list-item .top img{
        width:60px;
        height: 60px;
    }
    .partnerList .list-item .bottom{
        display: flex;
        text-align: center;
    }
    .partnerList .list-item span{
        color: #0078FF;
    }
    .partnerList .list-item .bottom li{
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
    .partnerList .list-item .arrow{
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