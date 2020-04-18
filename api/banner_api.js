const app = getApp();

//bannerId:判断banner和hot_pic
function getBannerId(bannerId){
  const banner = "/banner"; 
  if(bannerId == 1 || bannerId == 2){
    return banner+"?id="+bannerId;
  }else{
    console.log("未找到banner路径");
  }
};

//apiJvalue:api中json值 bannerNum:图片张数
function getBannerUrl(apiJValue,bannerNum){
  let bannerImgArray=new Array();
  for(var i=0;i<bannerNum;++i){
    bannerImgArray[i]=app.globalData.creeperUrl+apiJValue['items'][i]['img']['url'];
  }
  console.log(bannerImgArray);
  return bannerImgArray;
}

//apiJArray:图片的url值的数组 bannerNum:图片张数 bannerId:判断banner和hot_pic
function setBannerUrl(apiJArray,bannerNum,bannerId){
  var bannerJson={};
  var arrayData;
  if(bannerId==1){
    for(var i=0;i<bannerNum;++i){
      arrayData="adArray."+[i]+".src";
      bannerJson[arrayData]=apiJArray[i];
    }
    // console.log(bannerJson);
    return bannerJson;
  }else if(bannerId==2){
    for(var i=0;i<bannerNum;++i){
      arrayData="hotImgUrl";
      bannerJson[arrayData]=apiJArray[i];
    }
    // console.log(bannerJson);
    return bannerJson;
  }else{
    console.log("setBannerUrl error");
  }
}

module.exports={
  getBannerId:getBannerId,
  getBannerUrl:getBannerUrl,
  setBannerUrl:setBannerUrl
};