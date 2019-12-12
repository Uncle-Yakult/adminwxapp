<template>
    <div>
        <back></back>
        <div class="changeProject" @click="changeProject">
            <h3>雅居智联</h3>
            <p>角色：代理商</p>
            <span class="arrow-right"></span>
        </div>
    </div>
</template>

<script>
    import Back from "@/base/back"
    export default {//切换项目
        name: "changeProject",
        components:{
            Back
        },
        methods:{
            changeProject(){
                console.log(1)
            }
        }
    }
</script>

<style scoped>
    .changeProject{
        margin-top: 60px;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
        position: relative;
        height: 70px;
        padding: 10px 20px 0;
        line-height: 30px;
    }
    .changeProject .arrow-right{
        width: 16px;
        height: 16px;
        position: absolute;
        top: 50%;
        right: 10px;
        background: url("../../assets/image/icon/arrow-right.png");
        margin-top: -8px;
    }
</style>