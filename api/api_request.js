
const app = getApp();
// const creeperApi = "https://creeper.ds918.top/api/v1";

//api get
function getApi(url,callback){
  wx.showLoading({
    title: '管家进行加载中...',
  })
  wx.request({
    url: app.globalData.creeperApi +url,
    data:{
  
    },
    header: { 'Content-Type': 'application/json' }, 
    timeout:5000,
    success(res){
      wx.hideLoading({
        complete: (res) => {},
      })
      console.log(res.data);
      return typeof callback == "function" && callback(res.data);
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

//api post
function postApi(url,postData,callback){
  wx.showLoading({
    title: '管家进行上传中...',
  })
  wx.request({
    url: app.globalData.creeperApi+url,
    method:"POST",
    data: postData,
    header: { 'Content-Type': 'application/json' }, 
    timeout:5000,
    success(res){
      wx.hideLoading({
        complete: (res) => {},
      })
      console.log(res.data);
      return typeof callback == "function" && callback(res.data);
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

//token test
function testToken(){
  wx.request({
    url: app.globalData.creeperApi + '/testToken',
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
}

module.exports={
  getApi:getApi,
  postApi:postApi,
  testToken:testToken
};