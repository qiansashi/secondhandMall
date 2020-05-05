// pages/details/details.js
const app=getApp();
import {getMoreDetails} from "../../api/recent_product_api";
import {getApi}from "../../api/api_request";
import {postTokenApi} from "../../api/api_token_request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productId:0,
    name:"",
    time:"",
    price:"",
    nickName:"",
    detail:"",
    imgArray:[],
    commentArray:[],
    commentInput:"",
    commentlist:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const detail="/productdetail"+"?id=";
    that.getProductId();
    getApi(detail+wx.getStorageSync("productId"),function(res){
      that.setData({
        name: getMoreDetails(res)["name"],
        time:getMoreDetails(res)["time"],
        price:getMoreDetails(res)["price"],
        nickName:getMoreDetails(res)["nickName"],
        detail:getMoreDetails(res)["detail"],
        imgArray:getMoreDetails(res)["imgArray"]
      })
    });
    that.getComment();
  },

  formSubmit: function (e) {
    var that = this;
    const comment="/addcomment"
    wx.showToast({
      title: '留言成功！',
      icon: 'success',
    });
    console.log(that.data.commentInput);
    postTokenApi(comment,{
      comment:that.data.commentInput,
      id:that.data.productId
    },function(res){
      console.log(res.data);
      if(res.statusCode == 200){
        that.setData({
          commentArray: res.data
        })
        that.onLoad();
      }else{
        //留言失败
        console.log("comment error!");
      }
    })
  },

  inputComment:function(e){
    var that=this;
    that.setData({
      commentInput:e.detail.value
    })
  },

  previewImage:function(e){
    var that=this;
    var imgUrlList=new Array();
    for(var each in that.data.imgArray){
      imgUrlList[each]=that.data.imgArray[each]["imgSrc"];
    }
    wx.previewImage({
      urls: imgUrlList,
      current:imgUrlList[e.currentTarget.dataset.index]
    })
  },

  addMyFavourite: function(){
    var that=this;
    if(wx.getStorageSync('favourite').indexOf(that.data.productId)<0){
      wx.setStorageSync('favourite', wx.getStorageSync('favourite').concat(that.data.productId));
      wx.showToast({
        title: '收藏成功',
      })
    }else{
      wx.showToast({
        title: '收藏过啦...',
        icon:"none"
      })
    }
    
    console.log(wx.getStorageSync('favourite'));
  },

  getComment: function(){
    var that=this;
    const loadComment="/loadcomment"+"?id=";
    getApi(loadComment+that.data.productId,function(res){
      that.setData({
        commentlist: res,
      })
    })
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
    this.onLoad();
    wx.stopPullDownRefresh();
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

  getProductId:function(){
    var that=this;
    try{
      var productId=wx.getStorageSync('productId');
      console.log(productId);
      that.setData({
        productId:productId
      })
    }catch(e){
      console.log(e);
    }
  },

})