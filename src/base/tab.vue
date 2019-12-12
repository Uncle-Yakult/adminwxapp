<template>
    <div class="tab" v-if="flag">
        <router-link to="/home" class="tab-item">
            <img class="tab-icon" src="../assets/image/5.1.png"/>
            <span class="tab-link">主页</span>
        </router-link>
        <router-link to="/partner" class="tab-item">
            <img class="tab-icon" src="../assets/image/icon/yonghu1.png"/>
            <span class="tab-link">代理</span>
        </router-link>
        <router-link to="/place" class="tab-item">
            <img class="tab-icon" src="../assets/image/7.1.png"/>
            <span class="tab-link">网点</span>
        </router-link>
        <router-link to="/my/logs" class="tab-item">
            <img class="tab-icon" src="../assets/image/9.1.png"/>
            <span class="tab-link">订单</span>
        </router-link>
        <router-link to="/my" class="tab-item">
            <img class="tab-icon" src="../assets/image/8.1.png"/>
            <span class="tab-link">我的</span>
        </router-link>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                flag:true
            }
        }
    }
</script>

<style scoped>
    .tab{
        width: 100%;
        display: flex;
        font-size: 12px;
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        padding: 3px 0;
    }
    .tab-item{
        flex: 1;
        text-align: center;
    }
    .tab-item img{
        width: 25px;
        height: 25px;
        margin: 0 auto;
    }
    .tab-link{
        padding-bottom: 5px;
    }
    .router-link-active .tab-link{
        color: rgba(0,144,255,1);
    }

</style>