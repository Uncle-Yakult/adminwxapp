// 引用axios 用于XHR请求
import axios from 'axios';
import Vue from 'vue';
import router from "vue-router"
// import qs from "qs"
// import EXIF from 'exif-js';
import {
  md5,
  cookie
} from 'vux';



const $app = {
  /*********************************************
   * ajax 请求
   * url => 请求地址（字符串）
   * params => 请求参数（对象）
   * success => 成功返回（回调函数）
   * fail => 失败返回（回调函数）
   * xhr => 选填，请求类型POST/GET/PUT/DELETE (必须大小)
   *********************************************/
  ajax(url, params, success, fail, xhr) {
    // 自定义判断元素类型JS
    let toType = obj => ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

    // 参数过滤函数
    let filterNull = o => {
      for (var key in o) {
        if (o[key] === null) {
          delete o[key]
        }
        if (toType(o[key]) === 'string') {
          o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
          o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
          o[key] = filterNull(o[key])
        }
      }
      return o
    }

    if (params) {
      params = filterNull(params)
    }

    //把对象转为数组
    var keys = []; //键
    var vals = []; //值
    for (var i in params) {
      keys.push(i);
      vals.push(params[i]); //取得value
    }
    // console.log("keys = ",keys);
    // console.log("vals = ",vals);

    // Axios 不能直接传对象 需new FormData()
    var formData = new FormData();
    keys.forEach((val, i) => {
      formData.append(val, vals[i]);
    });


    var method = '';
    if (!xhr) { //大多数项目基本都是POST请求
      method = 'POST';
    } else {
      method = xhr;
    }

    axios({
      method: method,
      url: '/index.php?route=' + url,
      data: method === 'POST' || method === 'PUT' ? formData : null,
      params: method === 'GET' || method === 'DELETE' ? formData : null,
      timeout: 10000, //网络超时
      // baseURL: 'https://api.yunyihui.net', //基础域名 选填
      baseURL: 'https://api.yajuline.com/yajuline_dev/admin_api', //基础域名 选填
      withCredentials: true, //能否跨域
      // responseType: 'JSON',//需要注释，控制台一直报warn
      headers: { //自定义请求头部
        'Content-Type': 'application/x-www-form-urlencoded',
        'Client': 'wechat'
      }
      //允许在向服务器发送前，修改请求数据
      // ,transformRequest: [function (data) {
      //   // 对 data 进行任意转换处理
      //   console.log('data = ',data);
      //   return data;
      // }]
    }).then(function (res) { //请求成功
      console.log('res = ', res);
      var resData = res.data;
      //加载框 隐藏
      // $app.loadHide();
      if (res.data.errorCode == 0||res.data.errorCode == 1) { //请求成功
            success(resData);
      }
        else if (res.data.errorCode == 98) {//需要重新登录
            if(!$app.judageData($app.getCookie('admin_id'))){//在没有cookie时
                $app.toast('请重新登录');
                location.href = '#/login'
            }else{//每次请求带98时，跳回主页
                location.href = '#/'
            }
        }
      else { //请求失败
        // $app.alert({
        //   text: resData.msg,
        //   callBack: function () {
        //     if (typeof fail === 'function') {
        //       fail(resData);
        //     }
        //   }
        // });
      }

    }).catch(function (res) { //请求失败
      console.log('请求失败 = ', res);
    });
  },
    //调起 微信 jssdk
    wxJsSDK(callBack) {
        const wx = Vue.wechat;
        console.log('wx  = ', wx);

        $app.ajax('system/common/wechat_jssdk', {}, (resData) => {
            console.log('wechat_jssdk ');
            console.log("resData",resData)
            var appId = resData.data.appId;
            var timestamp = resData.data.timestamp;
            var nonceStr = resData.data.nonceStr;
            var signature = resData.data.signature;
            //注入配置
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: nonceStr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline', //分享到朋友圈
                    'onMenuShareAppMessage', //分享给朋友
                    'onMenuShareQQ', //分享到QQ
                    'onMenuShareWeibo', //分享到腾讯微博
                    'onMenuShareQZone', //分享到QQ空间
                    'startRecord', //开始录音接口
                    'stopRecord', //停止录音接口
                    'onVoiceRecordEnd', //监听录音自动停止接口
                    'playVoice', //播放语音接口
                    'pauseVoice', //暂停播放接口
                    'stopVoice', //停止播放接口
                    'onVoicePlayEnd', //监听语音播放完毕接口
                    'uploadVoice', //上传语音接口
                    'downloadVoice', //下载语音接口
                    'chooseImage', //拍照或从手机相册中选图
                    'previewImage', //预览图片接口
                    'uploadImage', //上传图片接口
                    'downloadImage', //下载图片接口
                    'translateVoice', //识别音频并返回识别结果接口
                    'getNetworkType', //获取网络状态接口
                    'openLocation', //使用微信内置地图查看位置接口
                    'getLocation', //获取地理位置接口
                    'hideOptionMenu', //隐藏右上角菜单接口
                    'showOptionMenu', //显示右上角菜单接口
                    'hideMenuItems', //批量隐藏功能按钮接口
                    'showMenuItems', //批量显示功能按钮接口
                    'hideAllNonBaseMenuItem', //隐藏所有非基础按钮接口
                    'showAllNonBaseMenuItem', //显示所有功能按钮接口
                    'closeWindow', //关闭当前网页窗口接口
                    'scanQRCode', //调起微信扫一扫接口
                    'chooseWXPay', //微信支付,发起一个微信支付请求
                    'openProductSpecificView', //跳转微信商品页接口
                    'addCard', //批量添加卡券接口
                    'chooseCard', //拉取适用卡券列表并获取用户选择信息
                    'openCard', //查看微信卡包中的卡券接口
					'getLocalImgData'//获取本地图片接口
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

            wx.ready(() => {
                if (typeof callBack === 'function') {
                    callBack(wx);
                }
            });
            wx.error(function (res) {
                console.log('微信SDK调起错误 = ', res);
            });

        }, () => {
            console.log('SDK调起失败')
        });
    },
    //启动相机 扫二维码
    openCamera(callBack) {
        const wx = Vue.wechat;
        //二维码扫扫
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                let urlCode = res.resultStr;
				console.log(urlCode);
                // let code = urlCode.substring(urlCode.indexOf('=') + 1);
                let code
                if(urlCode.indexOf('payMode/')>0){
                    code = urlCode.split('payMode/')[1];
                }else if(urlCode.indexOf('bluetooth/')>0){
                    code = urlCode.split('bluetooth/')[1];
                }
				console.log(code);
                callBack(code);
            }
        });
    },

  /*
  *
   * 获取HTML5本地存储的数据
   * 获取数据：localStorage.getItem(key)
   * 获取全部数据：localStorage.valueOf()
   * 删除数据：localStorage.removeItem(key)
   * 清空全部数据：localStorage.clear();
   * 获取本地存储数据数量：localStorage.length
   * 获取第 N 个数据的 key 键值：localStorage.key(N)
   * ---暂时改为sessionStorage----，
   **/
  getSettings(name) {
    let settingsText = sessionStorage.getItem(name);
    return JSON.parse(settingsText);
  },

  /**
   * settings:保存数据
   * name:保存数据名
   **/
  setSettings(settings, name) {
      sessionStorage.setItem(name, JSON.stringify(settings || {}));
  },

  /**
   * 删除应用本地配置
   **/
  removeSettings(name) {
      sessionStorage.removeItem(name);
  },

  //成功提示 1秒钟
  toast(text) {
    Vue.$vux.toast.show({
      text: text,
      time: 1000
    });
  },

  //提示框
  // alert(type) {
  //   Vue.$vux.alert.show({
  //     title: $app.judageData(type.title) ? type.title : '温馨提示',
  //     content: type.text,
  //     buttonText: $app.judageData(type.button) ? type.button : '确 定',
  //     onShow() {
  //       if (typeof type.callBack === 'function') {
  //         type.callBack();
  //       }
  //     }
  //   });
  // },

  //格式化时间戳
  //obj.type    1年月日时分 / 2年月日  / 3月日 / 4时分 / 5分秒 / 6时分秒
  //obj.time    时间戳
  formatTime(obj) {
    //格式化时间戳
    Date.prototype.Format = function (fmt) { // author: meizz
      let o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
      };
      if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
          .substr(4 - RegExp.$1.length));
      for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) :
            (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
    }

    let out = '';
    switch (parseInt(obj.type)) { //1年月日时分 / 2年月日  / 3月日 / 4时分 / 5分秒
      case 1:
        out = 'yyyy-MM-dd hh:mm';
        break;
      case 2:
        out = 'yyyy-MM-dd';
        break;
      case 3:
        out = 'MM-dd';
        break;
      case 4:
        out = 'hh:mm';
        break;
      case 5:
        out = 'mm:ss';
        break;
      case 6:
        out = 'hh:mm:ss';
        break;
    }

    return new Date(parseInt(obj.time) * 1000).Format(out);
  },
    // 获取cookie
    getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            console.log(arr);
            return unescape(arr[2]);
        } else {
            console.log('cookie.null');
            return null;
        }
        console.log(cookie.get(name));
        return cookie.get(name);
    },
    // 判断数据是否存在
    // 空对象，null，undefined，空数组，字符串，数字，0 全兼容
    judageData(data) {

        let judage;
        if (typeof data === 'number') {
            judage = true;
        } else if (typeof data === 'boolean') {
            judage = data;
        } else {
            if (data && data.length) {
                judage = true;
            } else {
                judage = false;
            }
        }
        return judage;
    },
    //loading框
    loading(text) {
        //没有时间限制, 会一直转转转下去
        Vue.$vux.loading.show({
            text: text
        });
    },
	
	//判断 苹果/安卓
	isApple() {
	  let judage;
	  //true苹果/false安卓
	  (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) ? judage = true: judage = false;
	  return judage;
	},
	
    //loading 隐藏
    loadHide() {
        Vue.$vux.loading.hide();
    },
	//选择图片函数
	chooseImage(callBack){
		let that = this;
		let $app = that.$app
		const wx = Vue.wechat;
		console.log("wx",wx)
		var imgArr;
		setTimeout(()=>{
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    var localIds = res.localIds; // 返回选定照片的本地ID列表（数组格式），localId可以作为img标签的src属性显示图片
                    console.log("本地id列表"+localIds)
                    callBack(localIds)
                }
            })
        },400)
	},
	getLocalImgData(localIds){
		const wx = Vue.wechat;
		var cache;
		wx.getLocalImgData({
			localId: localIds[0], // 图片的localID
			success: function (res) {
				var localData = res.localData;// localData是图片的base64数据，可以用img标签显示
				cache = localData
				console.log("函数的cache："+cache)
			}
		})
	}
}

// 返回在vue模板中的调用接口
export default $app;
