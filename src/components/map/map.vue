<template>
    <div>
        <div id="iframe">
            <iframe class="map-item" id="getAddress" @load="loadiframe"
                    src="https://m.amap.com/picker/?key=58ae55fb7a3d448ef5fe83cd13c6fef7"
                    style="width:100%; height:100%;position: absolute;z-index:22222;"></iframe>
        </div>
    </div>
</template>

<script>
    export default {
        name: "map",
        methods:{

        }
    }
</script>

<style scoped>
    .map-item {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        background: #fff;
        z-index: 222;
    }
</style>