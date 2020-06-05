// pages/publish/publish.js
const app = getApp();
import {postTokenApi} from "../../api/api_token_request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name_value:"",
    autofocus: true,
    detail_value:"",
    price_value:"",
    totalwords: 0 +"/120",
    color: "color:balck",
    imgs: [] ,
  },

  bindNameValue: function(e){
    var that=this;
    that.setData({
      name_value:e.detail.value
    })
  },

  bindPriceValue:function(e){
    var that=this;
    that.setData({
      price_value:e.detail.value
    })
  },

  bindDetailValue:function(e){
    var that=this;
    var strlen=e.detail.value.length;
    // console.log("当前字符串长度为"+strlen);
    that.setData({
      detail_value: e.detail.value,
      totalwords: strlen + "/120",
    });
    if(strlen == 120){
      that.setData({
        color:"color: red"
      })
    }else{
      that.setData({
        color:"color: black"
      })
    }
  },

  /**
   * 选择图片点击
   */
  chooseImage:function(){
    let that = this;
    wx.chooseImage({
      // count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        for(let i =0; i < tempFilePaths.length; i++){
          that.setData({
            imgs: that.data.imgs.concat(tempFilePaths[i])
          })
        }
      }
    })
  },
  /**
   * 预览图片
   */
  previewImage:function(e){
    let _index = e.currentTarget.dataset.index;
    let list = this.data.imgs;
    let current = list[_index];
    wx.previewImage({
      current: current, 
      urls: list 
    })
  },

  /**
   * 删除图片
   */
  delImage:function(e){
    let _index = e.currentTarget.dataset.index;
    let previewImage = this.data.imgs;
    console.log(previewImage)
    previewImage.splice(_index, 1);
    this.setData({
      imgs: previewImage
    })
  },

  upload: function(){
    var that=this;
    const addUrl="/addProduct";
    let imgs = this.data.imgs;
    postTokenApi(addUrl,{
      name:that.data.name_value,
      price:that.data.price_value,
      summary:that.data.detail_value
    },
    function(res){
      var pid = res.data['pid'];
      console.log(pid);
      for (let i = 0; i < imgs.length; i++){
        wx.uploadFile({
          url: app.globalData.creeperApi+'/upload', 
          filePath: imgs[i],
          header:{
            'token':wx.getStorageSync('token')
          },
          formData:{
            'pid': pid, //pid  商品编号
            'order':i+1
          },
          name: 'image',//name必须为image
          success: function (res) {
            console.log(res.data);
            wx.showToast({
              title: '上传成功！',
            })
            //上传成功
          },
          fail(){
            //上传失败
          }
        })
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