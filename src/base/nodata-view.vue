<template>
    <div class="no-dataView" v-if="show">
        <img src="../assets/image/no_data.png" alt="">
        <p>当前暂无数据哦！</p>
    </div>
</template>

<script>
    export default {
        name: "nodata-view",
        props:{
            show:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style scoped>
    .no-dataView{
        padding-top: 30px;
        width: 40%;
        margin: 0 auto;
    }
    .no-dataView img{
        width: 100%;
    }
    .no-dataView p{
        color: #424D59;
        font-size: 14px;
        padding-top: 8px;
    }
</style>