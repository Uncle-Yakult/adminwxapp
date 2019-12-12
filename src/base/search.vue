<template>
    <div class="search clearfix">
        <img src="../assets/image/s.png" alt="">
        <input type="search" placeholder="请输入搜索内容">
    </div>
</template>

<script>
    export default {
        name: "search"
    }
</script>

<style scoped>
    .search{
        margin-top: 10px;
        position: relative;
        height: 30px;
    }
    .search img{
        width: 14px;
        height: 14px;
        position: absolute;
        top: 8px;
        left: 30px;
    }
    .search input{
        margin-left: 10px;
        border: 1px solid #ccc;
        width: 55%;
        text-indent: 50%;
        height: 30px;
        border-radius: 17px;
    }
    .search input:focus{
        text-indent:32px;
    }
</style>