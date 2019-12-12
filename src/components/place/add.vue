<template>
  <div class="addPlace" @click="showChange">
    <back :to="1"></back>
    <!-- <div @click="chooseImg">
			<img :src="imgSrc?imgSrc:common" alt="" v-if="imgArr.length<=1" class="lager">
			<div class="img-box" v-else>
				<img :src="item.localData" alt="" v-for="item in imgArr">
			</div>
    </div>-->
    <!-- <input type="file" id="img" @change="getVal" accept="image/png, image/jpeg, image/gif, image/jpg"> -->
    <ul class="inputs">
      <li>
        <span>网点名称</span>
        <input type="text" placeholder="请输入网点名称" maxlength="11" v-model="hotel_name" />
      </li>
      <li>
        <span>网点类型</span>
        <input
          type="text"
          placeholder="请选择网点类型"
          v-model="hotel_type"
          disabled="disabled"
          style="background: transparent"
        />
        <button @click.stop="changeType">
          选择
          <i></i>
        </button>
      </li>
      <li>
        <span>代理商</span>
        <input type="text" placeholder="请选择代理商" disabled="disabled" v-model="dls_name" />
        <button @click="choose">选择</button>
      </li>
      <li class="shopAddress">
        <span>网点地址</span>
        <!-- <v-distpicker :placeholders="placeholders" @selected="selected"></v-distpicker> -->
        <!-- 一级 -->
        <div class="selectBox">
          <div class="selectText" @click="selectBoxOne">{{regionOne}}</div>
          <div class="select" v-if="showOne">
            <div class="selectNa">
              <div
                class
                v-for="(item,index) in province"
                :key="index"
                :data-value="item.label"
                :data-id="item.id"
                @click="nameOne($event)"
              >{{item.label}}</div>
            </div>
          </div>
        </div>
        <!-- 二级 -->
        <div class="selectBox">
          <div class="selectText" @click="selectBoxTwo">{{regionTwo}}</div>
          <div class="select" v-if="showTwo">
            <div class="selectNa">
              <div
                class
                v-for="(item,index) in city"
                :key="index"
                :data-value="item.label"
                :data-id="item.id"
                @click="nameTwo($event)"
              >{{item.label}}</div>
            </div>
          </div>
          <!-- <select size="5" v-if="showTwo" class="select" @change="nameTwo($event)">
            <option
              style="font-size: large;"
              v-for="(item,index) in region1"
              :key="index"
              :value="item.id"
            >{{item.id}}</option>
          </select> -->
        </div>
        <!-- 三级 -->
        <div class="selectBoxthree">
          <div class="selectText" @click="selectBoxThree">{{regionThree}}</div>
          <div class="select" v-if="showThree">
            <div class="selectNa">
              <div
                class
                v-for="(item,index) in county"
                :key="index"
                :data-value="item.label"
                :data-id="item.id"
                @click="nameThree($event)"
              >{{item.label}}</div>
            </div>
          </div>
          <!-- <select size="5" v-if="showThree" class="select" @change="nameThree($event)">
            <option
              style="font-size: large;"
              v-for="(item,index) in region3"
              :key="index"
              :value="item.id"
            >{{item.id}}</option>
          </select> -->
        </div>

        <input type="text" placeholder="请填写详细地址" v-model="address_main" />
      </li>
      <li>
        <span>网点描述</span>
        <input type="text" placeholder="请输入内容" v-model="description" />
      </li>
      <li>
        <button class="save" @click="savePlace">保存</button>
      </li>
    </ul>
    <scroll-picker :maps="maps" :map.sync="map" :show="showTab" v-on:showChange="showChange"></scroll-picker>
    <div class="dls-chooseBox" v-show="isChoose">
      <div class="top">
        <div :class="chooseType==1?'active':''" @click="changedls(1)">全部代理</div>
        <div :class="chooseType==2?'active':''" @click="changedls(2)">下级代理</div>
      </div>
      <div class="middle">
        <span class="icon el-icon-search"></span>
        <!-- <span class="icon el-icon-arrow-down"></span> -->
        <input type="text" placeholder="请输入搜索内容" v-model="search_dls" />
        <select ref="selectType" @change="showValue">
          <option value="0">全部</option>
          <option value="1">业务员</option>
          <option value="2">商户</option>
        </select>
      </div>
      <div class="bottom" ref="wrapper">
        <ul class="item">
          <li v-for="(item,index) in list" :key="index" @click="close(item.admin_id,item.admin_name)">
            <input type="radio" name="dls-name" />
            <span class="name">{{item.admin_name}}</span>
            <span>手机号:{{item.mobile}}</span>
          </li>
        </ul>
      </div>
      <div class="close" @click="close">关闭</div>
      <div class="other" v-show="!have">没有查找到你搜索的内容</div>
    </div>
  </div>
</template>

<script>
import ScrollPicker from "@/base/scroll-pick";
import BScroll from "better-scroll";
import Back from "@/base/back";
import VDistpicker from "v-distpicker";
export default {
  data() {
    return {
      regionOne: "--",
      regionTwo: "--",
      regionThree: "--",
      showOne: false, //判断是否出现
      showTwo: false,
      showThree: false,
      imgSrc: "", //图片
      common: require("../../assets/image/btn_camera.png"),
      imgArr: [],
      hotel_name: "",
      hotel_type: "", //网点类型
      description: "", //描述
      admin_id: "",
      address: "", //地址
      dls: "", //代理商的id
      maps: [], //滚动选择器列表
      map: "",
      address_main: "", //详细地址
      showTab: false,
      HotelTypeList: "", //网点类型总表
      isChoose: false, //设置是否显示选择框
      list: {}, //代理商表
      search_dls: "", //搜索的代理商名字
      have: true,
      chooseType: 1, //选择代理的类型
      dls_name: "",
    //   placeholders: {
    //     province: "--- 省",
    //     city: "--- 市",
    //     area: "--- 区"
    //   },
      province: [],
      city: [],
      area: [],
    provinceid:'',
    cityid:'',
    areaid:'',
      canDo: true
    };
  },
  components: {
    Back,
    ScrollPicker,
    VDistpicker
  },
  methods: {
    //三级联动
    nameOne(e) {
        this.provinceid = e.srcElement.dataset.id;
      this.regionOne = e.srcElement.dataset.value;
      this.showOne = false;
      this.regionTwo = "--";
      this.regionThree = "--";
      //调取市级接口
      let $app = this.$app;
      $app.ajax("hotel/index/city", {province_id:e.srcElement.dataset.id}, res => {
      console.log("awdawd", res);
      this.city = res.data;
    });
    },
    nameTwo(e) {
        this.cityid = e.srcElement.dataset.id;
      this.regionTwo = e.srcElement.dataset.value;
      this.showTwo = false;
      this.regionThree = "--";
      //调取县级接口
      let $app = this.$app;
      $app.ajax("hotel/index/area", {city_id:e.srcElement.dataset.id}, res => {
      console.log("awdawd", res);
      this.county = res.data;
    });
    },
    nameThree(e) {
        this.areaid = e.srcElement.dataset.id;
      this.regionThree = e.srcElement.dataset.value;
      this.showThree = false;
    },
    selected(data) {
      console.log(data);
      this.address = `${data.province.value}${data.city.value}${data.area.value}`;
    },
    //省级选择
    selectBoxOne() {
      this.showOne = true;
    },
    selectBoxTwo() {

      if (this.regionOne != "--") {
        console.log("bb");
        this.showTwo = true;
      } else {
        this.$vux.toast.text("请选择省级地区", "middle");
      }
      console.log("22");
    },
    selectBoxThree() {
      if (this.regionOne == "--") {
        this.$vux.toast.text("请选择省级地区", "middle");
      } else if (this.regionTwo == "--") {
        this.$vux.toast.text("请选择市级地区", "middle");
      } else {
        this.showThree = true;
      }

      console.log("33");
    },
    // chooseImg(){
    // 	let that = this;
    // 	let $app = that.$app;
    // 	$app.wxJsSDK(function (wx) {//调起微信jssdk
    // 	    console.log("wx",wx)
    // 	    setTimeout(()=>{
    //             $app.chooseImage(localIds => {
    //                 console.log("选择图片的地址"+localIds)
    //                 wx.getLocalImgData({
    //                     localId: localIds.toString(), // 图片的localID为第1个
    //                     success: function (res) {
    //                         console.log("处理图片后信息",res)
    //                         const localData = res.localData;
    //                         // localData是图片的base64数据，可以用img标签显示
    //                         //因为安卓、苹果的处理方式不同（我们不一样！），在此做了些特殊的处理！
    //                         if(localData.indexOf('data:image') == 0){ //判断转换中是否带'data:image'
    //                             //苹果的直接赋值，默认生成'data:image/jpeg;base64,'的头部拼接
    //                             that.imgSrc=localData;
    //                         }else{
    //                             //此处是安卓中的唯一得坑！在拼接前需要对localData进行换行符的全局替换
    //                             //感兴趣的可以自行console或代理调试看看~老司机都懂~
    //                             //此时一个正常的base64图片路径就完美生成赋值到img的src中了
    //                             that.imgSrc="data:image/jpeg;base64,"+localData.replace(/\n/g,"");
    //                         }
    //                         console.log(that.imgSrc)
    //                     }
    //                 });

    //                 /*判断ios是不是用的 wkwebview 内核*/
    //                 // if (window.__wxjs_is_wkwebview){
    //                 //         wx.getLocalImgData({
    //                 //             localId:localIds[0],
    //                 //             success: function (res){
    //                 //                 var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
    //                 //                 localData = localData.replace('jgp', 'jpeg');//iOS 系统里面得到的数据，类型为 image/jgp,因此需要替换一下
    //                 //                 that.imgSrc = localData
    //                 //             }
    //                 //         })
    //                 // }else{   //如果不是用的wkwebview 内核 或者是用的安卓系统 执行下面的xunh
    //                 //     that.imgSrc = localIds[0]
    //                 // }
    //             });
    //         },400)
    //     })
    // },
    changeType() {
      //改变网点类型
      this.showTab = true;
    },
    getVal(e) {
      //获得图片的base64码
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$vux.toast.text(
          "图片类型必须是.gif,jpeg,jpg,png,bmp中的一种",
          "middle"
        );
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        this.imgSrc = e.target.result; //转换成base64的图片
      };
    },
    showChange(a) {
      //获取滚动选择的值
      this.showTab = false;
      if (a != this.map) {
        this.hotel_type = this.map;
      }
    },
    showValue() {
      //获取下拉选框的值
      let index = parseInt(this.$refs.selectType.value); //获取了相应的value值
      console.log(index);
    },
    close(a, b) {
      //关闭选择代理商框
      if (a && b) {
        this.dls = a;
        this.dls_name = b;
      }
      this.isChoose = false;
    },
    choose() {
      //选择代理商，显示选择框
      this.isChoose = true;
      this.menuScroll.refresh();
    },
    changedls(a) {
      //改变代理（全部，下级）
      let $app = this.$app;
      this.chooseType = a;
      if (a == 1) {
        $app.ajax("hotel/index/getAllDistributors", {}, res => {
          if (res.data == null) {
            this.have = false;
            this.list = res.data;
          }
          this.list = res.data;
        });
      } else {
        $app.ajax("hotel/index/getChildDistributors", {}, res => {
          if (res.data == null) {
            this.have = false;
            this.list = res.data;
          }
          this.list = res.data;
        });
      }
    },
    savePlace() {
      //保存网点
      let that = this;
      let $app = this.$app;
      let typeKey, lat, lng;
      // let url = "https://restapi.amap.com/v3/geocode/geo?parameters"//使用高德地图接口
      for (let key in this.HotelTypeList) {
        if (this.HotelTypeList[key] == this.map) {
          typeKey = key;
          break;
        }
      }
    //   if (!$app.judageData(this.imgSrc)) {
    //     this.$vux.toast.text("请选择图片！", "middle");
    //     return false;
    //   }
      if (!$app.judageData(this.address_main)) {
        this.$vux.toast.text("请填写详细地址！", "middle");
        return false;
      }
    //   if (!$app.judageData(this.address)) {
    //     this.$vux.toast.text("请选择相应的省份！", "middle");
    //     return false;
    //   }
      let params = {
        hotel_name: this.hotel_name,
        type: typeKey,
        admin_id: this.dls,
        // lat:lat,
        // lng:lng,
        address: this.regionOne + this.regionTwo + this.regionThree + this.address_main,
        description: this.description,
        images: this.imgSrc,
        province_id: this.provinceid,
        city_id:this.cityid,
        area_id:this.areaid
      };
      console.log("gayudwjyygabi",params)
      $app.loading("loading");
      console.log("关闭")
      if (this.canDo) {
        this.canDo = false;
        $app.ajax("hotel/index/add", params, res => {
          that.canDo = true;
          
          if (res.errorCode == 1) {
            that.$vux.toast.text(res.msg, "middle");
          } else {
            that.$vux.toast.text(res.msg, "middle");
            that.$router.push("/place/list");
          }
        });
        $app.loadHide();
        Vue.$vux.loading.hide()
      }
    },
    _initScroll() {
      let wrapper = this.$refs.wrapper;
      this.menuScroll = new BScroll(wrapper, {});
      console.log(this.menuScroll);
    }
  },
  created() {
    let $app = this.$app;
    let user_id = $app.getSettings("admin_id");
    let sign = $app.getSettings("sign");
    $app.ajax("hotel/index/getAllDistributors", { user_id, sign }, res => {
      //获取全部代理
      console.log("获取全部代理" + JSON.stringify(res));
      this.list = res.data;
      this.menuScroll.refresh();
    });
  },
  mounted() {
    let $app = this.$app;
    $app.ajax("hotel/index/getHotelType", {}, res => {
      this.HotelTypeList = res.data;
      let arr = Object.values(res.data);
      this.maps = arr;
      this.map = this.maps[0]; //初始选值，在没有记录是默认第一个
    });

    //省级地区获取
    console.log("huaifdw");
    $app.ajax("hotel/index/province", {}, res => {
      console.log("awdawd", res);

      this.province = res.data;

      console.log(a);
    });

    //初始化需要滚动的对象
    this.$nextTick(() => {
      // this.$nextTick 是一个异步函数，为了确保 DOM 已经渲染
      this._initScroll();
    });
  },
  watch: {
    search_dls(a) {
      console.log(a);
      let $app = this.$app;
      let params = {
        content: a,
        is_all: 1
      };
      $app.ajax("hotel/index/searchAdmin", params, res => {
        console.log(res);
        if (res.data == null) {
          this.have = false;
          this.list = [];
        } else {
          this.list = res.data;
          this.have = true;
        }
      });
    }
  }
};
</script>

<style scoped>
.selectBox {
  width: 80px;
  height: 30px;
  display: inline-flex;
  flex-wrap: wrap;
  margin-left: 4px;
}
.selectText {
  width: 76px;
  height: 28px;
  border: 1px solid #333;
  display: inline-block;
  font-size: 16px;
  text-align: center;
  line-height: 28px;
  overflow: hidden;
}
.select {
  width: 76px;
  max-height: 300px;
  border: 1px solid #333;
  overflow: auto;
  z-index: 3;
  background: #fff;
}
.selectNa {
  width: 100%;
  min-height: 400px;
  overflow: hidden;
}
.selectNa div {
  height: 30px;
  text-align: center;
  overflow: hidden;
}
.selectBoxthree{
    width: 90px;
  height: 30px;
  display: inline-flex;
  flex-wrap: wrap;
  margin-left: 4px;
}
.selectBoxthree .selectText{
    width: 90px;
}
/* .selectText .option {
  font-size: larger;
  text-align: center;

  color: #0078ff;
} */

.distpicker-address-wrapper {
  width: 100% !important;
  display: flex;
  transform: scale(0.8);
  position: relative;
  left: -10%;
  top: 0;
}
.distpicker-address-wrapper select {
  float: left;
  flex: 1;
}
.img-box {
  height: 180px;
}
.img-box img {
  width: 33%;
}
.addPlace {
  padding-top: 50px;
}
.addPlace img.lager {
  width: 100%;
  height: 180px;
}
.addPlace #img {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 5;
  border: none;
  height: 180px;
  opacity: 0;
}
.addPlace .inputs {
  line-height: 40px;
  padding: 0 10px;
  margin-top: 20px;
}
.addPlace .inputs li {
  border-bottom: 1px solid #ccc;
  padding-left: 10px;
}
.shopAddress {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
.addPlace .inputs li input {
  margin-left: 30px;
}
.addPlace .inputs li:nth-child(2) input {
  width: 120px;
}
.addPlace .inputs li:nth-child(2) button {
  width: 60px;
  height: 30px;
  text-indent: -0.8em;
  border: 1px solid #ddd;
  background: white;
  border-radius: 3px;
  position: relative;
}
.addPlace i {
  display: block;
  width: 0;
  height: 0;
  border: 6px solid transparent;
  border-top-color: #000;
  position: absolute;
  top: 12px;
  right: 6px;
}
.addPlace .inputs li:nth-child(3) input {
  width: 150px;
  text-indent: 1em;
  background: white;
}
.addPlace .inputs li:nth-child(3) button {
  width: 50px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 3px;
}
.addPlace .inputs li:nth-child(4) input,
.addPlace .inputs li:nth-child(5) input {
  height: 80px;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
}
.addPlace .inputs li .save {
  text-align: center;
  margin: 0 auto;
  width: 200px;
  height: 40px;
  background: #0078ff;
  color: white;
  display: block;
  border-radius: 5px;
}
.addPlace .inputs li:last-child {
  border: none;
  margin-top: 10px;
}
.addPlace .dls-chooseBox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 10;
  padding-top: 5px;
}
.addPlace .dls-chooseBox .top {
  display: flex;
  border: 1px solid #dddddd;
  margin: 0 8px;
  border-radius: 3px;
  background: #fff;
}
.addPlace .dls-chooseBox .top div {
  flex: 1;
  height: 35px;
  text-align: center;
  line-height: 35px;
  font-size: 15px;
}
.addPlace .dls-chooseBox .middle {
  padding: 8px;
  display: flex;
  position: relative;
  height: 30px;
  background: #fff;
}
.addPlace .dls-chooseBox .middle input {
  flex: 3;
  border: 1px solid #dddddd;
  margin-right: 10px;
  text-indent: 2em;
  border-radius: 20px;
}
.addPlace .dls-chooseBox .middle select {
  flex: 1.5;
}
.addPlace .dls-chooseBox .middle select option {
  height: 30px;
}
.addPlace .dls-chooseBox .middle .icon {
  position: absolute;
  top: 15px;
}
.addPlace .dls-chooseBox .middle .icon:first-child {
  left: 18px;
}
.addPlace .dls-chooseBox .middle .icon:nth-child(2) {
  right: 20px;
}
.addPlace .dls-chooseBox .bottom {
  background: #fff;
  position: relative;
  z-index: -1;
  height: 300px;
  padding: 3px 8px 0;
  border-top: 1px solid #ccc;
}
.addPlace .dls-chooseBox .bottom li {
  padding-left: 10px;
  line-height: 40px;
  border-bottom: 1px solid #e3e3e3;
  overflow: hidden;
  text-align: left;
  font-size: 14px;
  padding: 10px 0;
  box-shadow: 0 1px 3px #eee;
}
input[type="radio"] {
  margin: 0 10px;
}
.addPlace .dls-chooseBox .bottom li .name {
  width: 100px;
  display: inline-block;
}
.addPlace .close {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #0090ff;
  background: #fff;
  border-top: 1px solid #ccc;
  text-align: center;
  font-size: 15px;
}
.addPlace .other {
  text-align: center;
  font-size: 15px;
  line-height: 40px;
}
</style>