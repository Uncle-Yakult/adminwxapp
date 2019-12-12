import Vue from 'vue'
import Router from 'vue-router'


//路由跳转的组件注册
import Home from "@/components/home/home"
import Order from "@/components/order/order"//订单页
// import Device from "@/components/device/device"
import Login from "@/components/login/login"
import Reset from "@/components/reset/reset"
import Place from "@/components/place/place"
import PlaceList from "@/components/place/list"
import AddPlace from "@/components/place/add"
import editPlace from "@/components/place/edit"
import infoPlace from "@/components/place/info"
import bindPlace from "@/components/place/bind"
import PlaceDevices from "@/components/place/place-devices"
import Partner from "@/components/partner/partner"
import partnerList from "@/components/partner/list"
import addPartner from "@/components/partner/add"
import editPartner from "@/components/partner/edit"
import detailPartner from "@/components/partner/detail"
import nextList from "@/components/partner/nextList"
import nextDevices from "@/components/partner/partner-next-devices"
import My from "@/components/my/my"
import Pwd from "@/components/my/pwd"
import xiugai from "@/components/my/xiugai"
import qrcode from "@/components/my/qrcode"
import changeProject from "@/components/my/changeProject"
import Logs from "@/components/my/logs"
import deviceInfo from "@/components/device/deviceInfo"
import tixian from "@/components/my/tixian"
import CashIn from "@/components/my/cash-in"
import PersonSet from "@/components/my/personal_setting"
import NextPlace from "@/components/partner/partner-next-place"
Vue.use(Router)

export default new Router({
  routes: [
      {path:"/", redirect:"/home"},
      {path:"/home", component:Home,
          meta:{
              title:'首页'
          }},
      {path:"/order", component:Order,
          meta:{
              title:'订单列表'
          }},//订单
      // {path:"/device",component:Device,
      //     meta:{
      //         title:'设备列表'
      //     }},//设备
      {path:"/login",component:Login, meta:{title:'登录'}},//登陆页面
      {path:"/reset",component:Reset,
          meta:{
              title:'重置密码'
          }},//重设密码
      {path:"/partner",component:Partner,//代理管理
        children:[
            {path:"/",redirect:"list"},
            {path:"list",component:partnerList,
                meta:{
                    title:'代理团队'
                }},
            {path:"add",component:addPartner,
                meta:{
                    title:'新增代理'
                }},
            {path:"edit",component:editPartner,
                meta:{
                    title:'编辑代理'
                }},
            {path:"detail",component:detailPartner,
                meta:{
                    title:'代理详情'
                }},
            {path:"nextlist",component:nextList,
                meta:{
                    title:'代理团队'
                }},
            {path:"nextdevices",component:nextDevices,
                meta:{
                    title:'设备列表'
                }
            }
        ]
      },
      {path:"/place",component:Place,//网点
        children:[
            {path:"/",redirect:"list"},
            {path:"list",component:PlaceList,
                meta:{
                    title:'网点列表'
                }},
            {path:"add",component:AddPlace,
                meta:{
                    title:'添加网点'
                }},
            {path:"edit",component:editPlace,
                meta:{
                    title:'编辑网点'
                }},
            {path:"info",component:infoPlace,
                meta:{
                    title:'网点详情'
                }},
            {path:"bind",component:bindPlace,
                meta:{
                    title:'绑定网点'
                }},
            {path:"place-devices",component:PlaceDevices,
                meta:{
                    title:'设备管理'
                }}
            ]
      },
      {path:"/my",component:My,
          meta:{
              title:'我的'
          }},
      {path:"/my/pwd",component:Pwd,
          meta:{
              title:'修改密码'
          }},
      {path:"/my/xiugai",component:xiugai,
          meta:{
              title:'修改资料'
          }},
      {path:"/my/qrcode",component:qrcode,
          meta:{
              title:'添加二维码'
          }},
      {path:"/my/changeProject",component:changeProject,
          meta:{
              title:'切换项目'
          }},
      {path:"/my/logs",component:Logs,
          meta:{
              title:'分成记录'
          }
      },
      {path:"/my/tixian",component:tixian,
          meta:{
              title:'提现金额'
          }
      },
      {path:"/my/person_set",component:PersonSet,
          meta:{
              title:'个人设置'
          }
      },
      {path:"/cashIn",component:CashIn,
          meta:{
              title:'申请提现'
          }
      },
      {path:"/deviceInfo",component:deviceInfo,meta:{title:"设备详情"}},
      {path:"/nextplace",component:NextPlace,meta:{title:"网点列表"}}
  ],

})
