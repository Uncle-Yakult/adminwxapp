<template>
    <div class="order">
        <back></back>
        <ul class="list">
            <li :class="currentIndex==index?'active':''" >租借中({{num}})</li>
            <li>已完成({{num}})</li>
            <li>已撤销({{num}})</li>
            <li>超时中({{num}})</li>
        </ul>
        <div class="search clearfix">
            <img src="../../assets/image/s.png" alt="">
            <input type="search" placeholder="搜索订单">
            <div class="search-right fr">
                <span class="active">我的订单</span>
                <span>下级订单</span>
            </div>
        </div>
        <nodata-view :show="have"></nodata-view>
    </div>
</template>

<script>
    import NodataView from "@/base/nodata-view"
    import Back from "@/base/back"
    export default {
        data(){
            return{
                num:0,
                currentIndex:1,
                index:1,
                have:true
            }
        },
        components:{
            Back,
            NodataView
        }
    }
</script>

<style scoped>
    @import "~@/assets/css/order.css";
</style>