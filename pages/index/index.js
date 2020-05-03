//index.js
//获取应用实例
const app = getApp()
import { latestDataMock,indexDataMock } from "../../mock/release_data_mock.js";
import {getApi,postApi} from "../../api/api_request";
import {getBannerId,getBannerUrl,setBannerUrl} from "../../api/banner_api";
import {getRecentProductUrl, getRecentProductApi} from "../../api/recent_product_api";

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
    id:0,
    releaseName: "",
    DetailImgSrc: "",
    detailText:"",
    publisherName:"",
    publisherImgSrc:""
  }],
  page:0,
  topWelcomeText: "欢迎使用闲置管家",
  topText:"帮你的闲置快速换成钱哦~",
  movableViewX:300,
  movableViewY:450,
  scrollTop: 0 ,
  damping:100
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
    //跳转到相应页面
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
      that.setData(
        setBannerUrl(getBannerUrl(res,1),1,2)
      );
    })
    
  },

  getBannerImgUrl:function () {
    var that=this;
    getApi(getBannerId(1),function(res){
      that.setData(
        setBannerUrl(getBannerUrl(res,3),3,1)
      );
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
    });
    
  },
  
  onReachBottom: function(){
    var that=this;
    that.setData({page:that.data.page+1})
    getApi(getRecentProductUrl(1,5,that.data.page),function(res){
      wx.showToast({
        title: '加载成功！',
        duration:1500
      })
      that.setData({
        latestItemArray:that.data.latestItemArray.concat(getRecentProductApi(res,5))
      });
      console.log(that.data.latestItemArray.concat(getRecentProductApi(res,5)));
    });
  },

  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();
    var that=this;
    that.getHotImgUrl();
    that.getBannerImgUrl();
    that.getlatestData();
    that.setData({
      topWelcomeText:"闲置管家努力为您加载中...",
      topText:""
    });
    wx.stopPullDownRefresh({
      complete: (res) => {
        wx.hideNavigationBarLoading(); 
        that.setData({
          topWelcomeText:"欢迎使用闲置管家",
          topText:"帮你的闲置快速换成钱哦~"
        })
        wx.showToast({
          title: '刷新成功！',
          icon:"success",
          duration:1700
        })
      },
    })
    
  },

  getlatestData:function(){
    var that=this;
    // console.log(latestDataMock);
    // that.setData({
    //   latestItemArray:latestDataMock
    // })
    that.setData({page:1})
    getApi(getRecentProductUrl(1,5,that.data.page),function(res){
      that.setData({
        latestItemArray:getRecentProductApi(res,5)
      });
    });
    console.log(getRecentProductUrl(1,5,that.data.page));
  },

  goToDetail:function(e){
    var that=this;
    var productId=that.data.latestItemArray[e.currentTarget.dataset.index]["id"];
    console.log(productId);
    try{
      wx.setStorageSync('productId', productId);
      wx.redirectTo({
        url: '../details/details',
      })
    }catch(e){
      console.log(e);
    }
  },

  onPageScroll:function(e){
    var that=this;
    if(e.scrollTop > that.data.scrollTop || e.scrollTop == wx.getSystemInfoSync().windowHeight){
      that.setData({
        movableViewY:that.data.movableViewY+4.1
      });
    }else{
      that.setData({
        movableViewY:that.data.movableViewY-4.1
      })
    }
    setTimeout(function () {
      that.setData({
        scrollTop: e.scrollTop
      })
    }, 0)
    
  },

  postItems:function(){

  },
})

