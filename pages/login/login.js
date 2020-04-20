// pages/login/login.js

var baseUrl = "https://creeper.ds918.top/api/v1";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultSize: 'default',
    primarySize: 'default',
    warnSize: 'default',
    disabled: false,
    plain: false,
    loading: false
  },

  getToken:function(){
    //申请令牌
    wx.login({
      success (res) {
        if (res.code) {
          console.log('code:'+res.code);
          //发起网络请求
          wx.request({
            
            url: baseUrl + '/token/user',
            method:"POST",
            data: {
              code: res.code
            },
            success(res){
              console.log(res.data);
              wx.setStorageSync('token', res.data.token)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },

  testToken:function(){
    wx.request({
      url: baseUrl + '/testToken',
      header:{
        'token': wx.getStorageSync('token')
      },
      success(res){
        console.log(res);
        //判断res.data中是否存在error_code确定鉴权是否成功
        //error_code对应的错误码目前混乱，没有参考性
        if("error_code" in res.data){
          console.log(res.data.msg)
        } else{
          console.log('鉴权通过！')
        }
      },
      fail(){
        console.log('服务器请求失败！')
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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