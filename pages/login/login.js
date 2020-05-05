// pages/login/login.js
var baseUrl = "https://creeper.ds918.top/";
var apiUrl = "https://creeper.ds918.top/api/v1/";
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
    loading: false,
    imgs: [] ,
  },

  getToken:function(){
    //申请令牌
    wx.login({
      success (res) {
        if (res.code) {
          console.log('code:'+res.code);
          //发起网络请求
          wx.request({
            
            url: apiUrl + 'token/user',
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
      url: apiUrl + '/testToken',
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
        let imgs = that.data.imgs;
        for(let i =0; i < tempFilePaths.length; i++){
          imgs.push(tempFilePaths[i])
        }
        that.setData({
          imgs: imgs
        })
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
      current: current, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
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
  /**
   * 上传图片
   * 先携带token上传name，price，summary，成功则返回商品编号pid
   * 再携带token和pid上传照片，微信uploadFile一次只能上传一张，所以循环上传
   * 
   */
  upload:function(e){
    let imgs = this.data.imgs;
    wx.request({
      url: apiUrl+'addProduct',
      header:{
        'token':wx.getStorageSync('token')
      },
      method:"POST",
      data:{
        name:'三星电视',
        price:'1999.99',
        summary:'采用最新的OLED面板，亮度高达1000nit'
      },
      success(res){
        var pid = res.data['pid'];
        console.log(pid);
        
        for (let i = 0; i < imgs.length; i++){
          wx.uploadFile({
            url: apiUrl+'upload', 
            filePath: imgs[i],
            header:{
              'token':wx.getStorageSync('token')//验证
            },
            formData:{
              'pid': pid //pid  商品编号
            },
            name: 'image',//name必须为image
            success: function (res) {
              var data = res.data;
              console.log(data)
              //上传成功
            },
            fail(){
              //上传失败
            }
          })
        }
      },
      fail(){
        //上传失败
      }
    });
    

  },

  //添加留言，需要登录才能留言
  formSubmit: function (e) {

    var that = this;
    var liuyantext = e.detail.value.liuyantext; //获取表单所有name=liuyantext的值 
    wx.showToast({
      title: '已留言',
      icon: 'success',
    })//瞎写的
    wx.request({
      url: apiUrl + 'addcomment',
      method:"POST",
      data: {
        comment:liuyantext,
        'id':'19'//传递商品id
      },
      header: {
        'Content-Type': 'application/json',
        'token': wx.getStorageSync('token')
      },
      success: function (res) {
        console.log(res);
        if(res.statusCode == 200){
          that.setData({
            re: res.data,
          })
          that.onLoad();//不知道这样刷新对不对？
          wx.hideToast();
        }else{
          //留言失败
        }
      },
    })
  },

  onPullDownRefresh: function () {
    wx.showNavigationBarLoading();
    var that = this
    wx.request({
      url: apiUrl + 'loadcomment',
      headers: {
        'Content-Type': 'application/json'
      },
      data:{
        'id' : '19'//传递商品id
      },
      success: function (res) {
        that.setData({
          commentlist: res.data,
        })
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: apiUrl + 'loadcomment',
      data:{
        'id' : '19'//传递商品id
      },
      success:function(res){
        console.log(res.data);
        that.setData({
          commentlist:res.data,
        })
      }
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