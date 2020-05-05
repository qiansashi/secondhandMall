const app = getApp();
// const creeperApi = "https://creeper.ds918.top/api/v1";

//api get(token)
function getTokenApi(url,callback){
  wx.showLoading({
    title: '管家进行加载中...',
  })
  wx.request({
    url: app.globalData.creeperApi +url,
    data:{
  
    },
    header: { 
      'Content-Type': 'application/json' ,
      'token':wx.getStorageSync('token')
    }, 
    timeout:5000,
    success(res){
      wx.hideLoading({
        complete: (res) => {},
      })
      console.log(res.data);
      return typeof callback == "function" && callback(res);
    },
    fail(res){
      wx.hideLoading({
        complete: (res) => {console.log(res.errMsg)},
      })
      wx.showToast({
        title: '加载失败，请稍后重试！',
        icon:fail,
        mask: true,
        duration: 1500
      })
    }
  })
};

//api post(token)
function postTokenApi(url,postData,callback){
  wx.showLoading({
    title: '管家进行上传中...',
  })
  wx.request({
    url: app.globalData.creeperApi+url,
    method:"POST",
    data: postData,
    header: { 
      'Content-Type': 'application/json',
      'token':wx.getStorageSync('token')
     }, 
    timeout:5000,
    success(res){
      wx.hideLoading({
        complete: (res) => {},
      })
      console.log(res.data);
      return typeof callback == "function" && callback(res);
    },
    fail(res){
      wx.hideLoading({
        complete: (res) => {console.log(res.errMsg)},
      })
      wx.showToast({
        title: '上传失败，请稍后重试！',
        icon:fail,
        mask: true,
        duration: 1500
      })
    }
  })
};

module.exports={
  getTokenApi:getTokenApi,
  postTokenApi:postTokenApi
}