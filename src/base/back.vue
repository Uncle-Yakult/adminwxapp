<template>
        <div class="back" @click="back">
            返回
        </div>
</template>

<script>
    export default {
        props:{
            to:{}
        },
        methods:{
            back(){
                if(this.to == null){
                    this.$router.go(-1)
                }else if (this.to == 1) {
                    this.$router.push('/home')
                }else if(this.to == 2){
                    this.$router.push("/my")
                }
            }
        }
    }
</script>

<style scoped>
    .back{
        width: 50px;
        margin: 10px 0;
        height: 29px;
        border: 1px solid #0078FF;
        border-left: none;
        border-radius: 0 16px 16px 0;
        line-height: 30px;
        text-indent: 0.5em;
        font-size: 13px;
        background: white;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10;
    }
</style>