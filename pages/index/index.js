//index.js
//获取应用实例
const app = getApp()

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
  },

  onReady: function () {
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getHotImgUrl();
    this.getBannerImgUrl();
  },

  pageSelect:function (item) {
    var id = item.currentTarget.dataset.id; 
    console.log(id)
    //调转到相应页面
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
    wx.request({
      url:'http://..',
      data:{
  
      },
      header: { 'Content-Type': 'application/json' }, 
      success(res){
        console.log(res.data);
        that.setData({
          HotImgUrl:res.data
        })
      }
    })
  },

  getBannerImgUrl:function () {
    var that=this;
    wx.request({
      // url:'http://api.ds918.top/api/v1/banner?id=10001',
      url:'',
      data:{
  
      },
      header: { 'Content-Type': 'application/json' }, 
      success(res){
        console.log(res.data);
        var data=res.data;
        let bannerImgArray=new Array();
        for(var i=0;i<3;++i){
          bannerImgArray[i]="http://api.ds918.top"+res.data['items'][i]['img']['image_url'].substring(2);
        }
        //测试接口获取值
        for(var initItem in data){
          if(initItem == 'items'){  
              var jValue=data[initItem];
              console.log(jValue);
              for(var i=0;i<3;i++){
                var items=jValue[i];
                console.log(items);
              }
          }
        }

        that.setData({
          "adArray.0.src": bannerImgArray[0],
          "adArray.1.src": bannerImgArray[1],
          "adArray.2.src": bannerImgArray[2],
        })
      }
    })
  },

})

