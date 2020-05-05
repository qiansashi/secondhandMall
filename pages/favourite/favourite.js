// pages/favourite/favourite.js
import {getDetailApi} from "../../api/recent_product_api";
import {getApi} from "../../api/api_request"

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
  },

  getData:function(){
    var that=this;
    const detail="/productdetail"+"?id=";
    that.setData({
      ItemArray:[]
    })
    wx.getStorage({
      key: 'favourite',
      success(res){
        console.log(res);
        for(var i in res.data){
          getApi(detail+res.data[i],function(res){
            that.setData({
              ItemArray: that.data.ItemArray.concat(getDetailApi(res))
            })
          })
        }
      }
    })
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData();
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

  }
})