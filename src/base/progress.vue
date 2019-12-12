<template>
    <div class="income">
        <h3 class="top clearfix">
            <p class="fl">7天收入情况</p>
            <p class="fr">{{year}}</p>
        </h3>
        <div class="vol-data">
            <div class="charts" style="width:100%;height:180px">
                <div id="myChart" :style="{width:'100%',height:'200px'}">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'//引用echarts组件
    export default {
        data(){
            return{
            }
        },
        props:{
            xAxis:{

            },
            year:{},
            series:{

            }
        },
        mounted(){
                var myChart = echarts.init(document.getElementById('myChart'));
                myChart.setOption({
                    xAxis: {
                        type: 'category',
                        data: this.xAxis
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            interval:0,
                            rotate:40
                        }
                    },
                    series: [{
                        data:this.series ,
                        type: 'line',
                        itemStyle : { normal: {label : {show: true}}}
                    }],
                    tooltip: {
                        trigger: 'item',
                        position: 'top',
                        formatter: "{c}"
                    }
                })
        },
        watch:{

        }
    }
</script>

<style scoped>
    .income{
        padding:15px;
        border-top: 6px solid #efeff4;
        font-size: 14px;
    }
    .top p{
        font-weight: normal;
        font-size: 16px;
    }
    .bottom li{
        padding: 5px 0;
    }
    .bottom li span:first-child{
        padding-right: 30px;
    }
    #myChart div{
        /*height: 150px !important;*/
    }
    canvas{
        margin-left: 1px;
    }
</style>