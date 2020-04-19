const app = getApp();

function getRecentProductUrl(status,listRows,pageNum){
  const getRecentProduct="/getRecentProduct";
  if(status == 1){
    return getRecentProduct+"?page="+pageNum+"&listrows="+listRows+"&paginate="+status;
  }else{
    return getRecentProduct+"?page=1&listrows=1&paginate=0";
  }
}

function getRecentProductApi(apiJValue,listRows){
  const images="/images";
  var productArray = new Array();
  for(var i=0;i<listRows;++i){
    productArray[i]={
    "id":apiJValue[i]["id"],
    "releaseName":apiJValue[i]["name"],
    "DetailImgSrc":app.globalData.creeperUrl+images+apiJValue[i]["main_img_url"],
    "detailText":apiJValue[i]["summary"],
    "publisherName":apiJValue[i]["userinfo"]["nickname"],
    "publisherImgSrc":app.globalData.creeperUrl+apiJValue[i]["userinfo"]["img_url"]
    }
  };
  // var productArrayJson = JSON.stringify(productArray);
  console.log(productArray);
  return productArray;
}

function setRecentProductApi(apiJArray,listRows){
  
}

module.exports={
  getRecentProductUrl:getRecentProductUrl,
  getRecentProductApi:getRecentProductApi
}