//index.js
//获取应用实例
const app = getApp()
import { latestDataMock } from "../../mock/release_data_mock.js";
import { indexDataMock } from "../../mock/release_data_mock";
import {getApi} from "../../api/api_request";
import {postApi} from "../../api/api_request";
import {getBannerId} from "../../api/banner_api";
Page({
  data: {
   topBarArray:[{
     id:"release",
     icon:"已发布",
     topBarBtn:"releaseBtn",
     topBarImg:"../../img/WechatIMG1.png"
   },{
    id:"sale",
    icon:"已卖出",
    topBarBtn:"saleBtn",
    topBarImg:"../../img/WechatIMG2.png"
  },{
    id:"bought",
    icon:"买到的",
    topBarBtn:"boughtBtn",
    topBarImg:"../../img/WechatIMG3.png"
  },{
    id:"favourite",
    icon:"收藏",
    topBarBtn:"favouriteBtn",
    topBarImg:"../../img/WechatIMG4.png"
  }],
  adArray: [{
    id:"1",
    src:"",
    num:"adImg01"
  },{
    id:"2",
    src:"",
    num:"adImg02"
  },{
    id:"3",
    src:"",
    num:"adImg03"
  }],
  currentSwiper: 0,
  autoplay: true,
  hotImgUrl: "",
  tagArray:[{
    id: "0",
    tagName: "最新发布"
  },{
    id: "1",
    tagName: "免费发布"
  }],
  mpoffsettop: -18,
  mpzindex: 4,
  latestItemArray:[{
    id: "0",
    publisherImgSrc:"",
    publisherName:"",
    detailText:"",
    DetailImgSrc:"",
    tag:"",
    date:""
  }]
  },

  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotImgUrl();
    this.getBannerImgUrl();
    this.getlatestData();
  },

  pageSelect:function (item) {
    var id = item.currentTarget.dataset.id; 
    console.log(id)
    //调转到相应页面
    switch(id){
      case "release":
        wx.redirectTo({ 
          url: '../released/released'
        });
        break;
      case "sale":
        wx.redirectTo({ 
          url: '../sale/sale'
        });
        break;
      case "bought":
        wx.redirectTo({ 
          url: '../bought/bought'
        });
        break;
      case "favourite":
        wx.redirectTo({ 
          url: '../favourite/favourite'
        });
        break;
    }
  },

  swiperChange:function (e) {
    this.setData({
      currentSwiper: e.detail.current
    });
  },

  tapBanner:function (e) {
    var src = e.currentTarget.dataset.src;
    console.log(src);
    wx.switchTab({ 
      url: '../release/release'
    });
  },

  getHotImgUrl:function () {
    var that=this;
    getApi(getBannerId(2),function(res){
      let hotImgArray=new Array();
      for(var i=0;i<1;++i){
        hotImgArray[i]=app.globalData.creeperUrl+res['items'][i]['img']['url'];
        console.log(hotImgArray);
      }
      that.setData({
        hotImgUrl:hotImgArray
      })
    })
    
  },

  getBannerImgUrl:function () {
    var that=this;
    getApi(getBannerId(1),function(res){
      let bannerImgArray=new Array();
      for(var i=0;i<3;++i){
        bannerImgArray[i]=app.globalData.creeperUrl+res['items'][i]['img']['url'];
      }
      //测试接口获取值
      for(var initItem in res){
        if(initItem == 'items'){  
            var jValue=res[initItem];
            console.log(jValue);
            for(var i=0;i<3;i++){
              var items=jValue[i];
              console.log(items);
            }
          }
      }
      that.setData({
        "adArray.0.src": bannerImgArray[0],
        "adArray.1.src": bannerImgArray[1],
        "adArray.2.src": bannerImgArray[2],
      })
    });
    
  },
  
  getlatestData:function(){
    var that=this;
    console.log(latestDataMock);
    that.setData({
      latestItemArray:latestDataMock
    })
  }
})

