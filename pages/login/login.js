// pages/login/login.js

import {getApi,postApi,testToken} from "../../api/api_request";
const tokenApi= '/token/user';
const pvApi= '/RecentViews';
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: true,
    loading: false,
    aboutUs:app.globalData.aboutUs,
    pv:0,
    version:"1.3.3"
    // userInfo:{
    //   avatarUrl: "",
    //   nickName:""
    // },
    
  },

  getToken:function(){
    //申请令牌
    wx.login({
      success(res){
        if(res.code){
          postApi(tokenApi,{code:res.code},function(res){
            wx.setStorageSync('token', res.token);
            wx.showToast({
              title: '登陆成功',
            })
          })
        }else{
          console.log("登陆失败！");
        }
      }
    })
    testToken();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getUserInfo({
    //   success: res => {
    //     app.globalData.userInfo = res.userInfo;
    //     console.log("app.globalData.userInfo="+app.globalData.userInfo);
    //     this.setData({
    //       "userInfo.avatarUrl": res.userInfo.avatarUrl,
    //       "userInfo.nickName": res.userInfo.nickName
    //     })
    //   },fail:res =>{
    //     console.log("getUserInfo error");
    //   }
    // })
    var that=this;
    getApi(pvApi,function(res){
      that.setData({
        pv:res[0]["count"]
      })
    });
  },

  tap2Version:function(){
    wx.navigateTo({
      url: '../version/version',
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
    wx.stopPullDownRefresh({
      complete: (res) => {},
    });
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

  tap2ContactUs: function(){
    wx.navigateTo({
      url: '../aboutus/aboutus',
    })
  },

})