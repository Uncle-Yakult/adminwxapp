<template>
    <div class="person_set">
        <div style="height: 50px"></div>
        <back></back>
        <group>
            <x-switch title="分成可见" v-model="value"></x-switch>
        </group>
    </div>
</template>

<script>
    import { XSwitch,Group } from 'vux'
    import Back from "@/base/back"
    import { mapMutations } from "vuex"
    export default {//个人设置
        data(){
            return{
                value:""
            }
        },
        methods:{
            ...mapMutations(["setIsShow"])
        },
        components:{
            XSwitch,
            Back,
            Group
        },
        watch:{
            value(a){
                this.setIsShow(a)
            }
        }
    }
</script>

<style scoped>
    .person_set .switch{
        border-top: 1px solid #e3e3e3;
        border-bottom: 1px solid #e3e3e3;
    }
</style>