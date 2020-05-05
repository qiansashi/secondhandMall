// pages/release/release.js
import { latestDataMock } from "../../mock/release_data_mock" ;
import {getApi,postApi} from "../../api/api_request";
import {getRecentProductUrl, getRecentProductApi,JudgeSum,getRecentNameApi,getDetailApi} from "../../api/recent_product_api";
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ItemArray:[{
      id:0,
      releaseName: "",
      DetailImgSrc: "",
      detailText:"",
      publisherName:"",
      publisherImgSrc:"",
      releaseTime:""
    }],
    page:0,
    sum:0,
    item_value:"",

  },

  bindItemValue: function(e){
    var that=this;
    that.setData({
      item_value:e.detail.value
    })
  },

  getItemInfo:function(e){
    var that=this;
    const detail="/productdetail"+"?id=";
    console.log(e.detail.value);
    if(e.detail.value !=""){
      that.setData({
        ItemArray:[]
      })
      wx.getStorage({
        key: 'searchList',
        success(res){
          console.log(res);
          for(var i in res.data){
            if(res.data[i].releaseName.indexOf(e.detail.value)>=0){
              getApi(detail+res.data[i].id,function(res){
                that.setData({
                  ItemArray: that.data.ItemArray.concat(getDetailApi(res))
                })
              })
            }
          }
        }
      })
    }else{
      
    }
    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    that.getData();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onReachBottom: function(){
    var that=this;
    console.log(that.data.sum);
    if(that.data.page>that.data.sum){
      wx.showToast({
        title: '到底了哦~',
      })
    }else{
      that.setData({page:that.data.page+1})
      getApi(getRecentProductUrl(1,5,that.data.page),function(res){
        wx.showToast({
          title: '加载成功！',
          duration:1500
        })
        that.setData({
          ItemArray:that.data.ItemArray.concat(getRecentProductApi(res,5))
        });
        wx.setStorageSync('searchList', wx.getStorageSync('searchList').concat(getRecentNameApi(res)));
        console.log(that.data.ItemArray.concat(getRecentProductApi(res,5)));
      });
    }
    
  },

  onPullDownRefresh:function(){
    wx.showNavigationBarLoading();
    var that=this;
    that.getData();
    wx.stopPullDownRefresh({
      complete: (res) => {
        wx.hideNavigationBarLoading(); 
        wx.showToast({
          title: '刷新成功！',
          icon:"success",
          duration:1700
        })
      },
    })
    
  },

  getData:function(){
    var that=this;
    // console.log(latestDataMock);
    // that.setData({
    //   ItemArray:latestDataMock
    // })
    that.setData({page:1})
    getApi(getRecentProductUrl(1,5,that.data.page),function(res){
      that.setData({
        ItemArray:getRecentProductApi(res,5),
        sum:JudgeSum(res,5)
      });
      wx.setStorageSync('searchList', getRecentNameApi(res));
    });
    console.log("RecentProductUrl:"+getRecentProductUrl(1,5,that.data.page));
  },

  goToDetail:function(e){
    var that=this;
    var productId=that.data.ItemArray[e.currentTarget.dataset.index]["id"];
    console.log(productId);
    try{
      wx.setStorageSync('productId', productId);
      wx.navigateTo({
        url: '../details/details',
      })
    }catch(e){
      console.log(e);
    }
  }
})
