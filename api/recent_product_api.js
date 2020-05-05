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
  var length=getRecentProductLength(apiJValue)-1;
  console.log("length:"+length);
  for(var i=0;i<length;++i){
    productArray[i]={
      "id":apiJValue[i]["id"],
      "releaseName":apiJValue[i]["name"],
      "DetailImgSrc":app.globalData.creeperUrl+images+apiJValue[i]["main_img_url"],
      "detailText":apiJValue[i]["summary"],
      "publisherName":apiJValue[i]["userinfo"]["nickname"],
      "publisherImgSrc":app.globalData.creeperUrl+apiJValue[i]["userinfo"]["img_url"],
      "releaseTime":apiJValue[i]["create_time"]
    }
  };
  // var productArrayJson = JSON.stringify(productArray);
  console.log(productArray);
  return productArray;
}

function getRecentNameApi(apiJValue){
  var productNameArray = new Array();
  var length=getRecentProductLength(apiJValue)-1;
  console.log("length:"+length);
  for(var i=0;i<length;++i){
    productNameArray[i]={
      "id":apiJValue[i]["id"],
      "releaseName":apiJValue[i]["name"]
    };
  };
  console.log(productNameArray);
  return productNameArray;
}

function JudgeSum(apiJValue,listRows){
  let sum=apiJValue["sum"];
  return(Math.ceil(sum/listRows));
}

function getRecentProductLength(apiJValue){
  var length=0;
  for(var all in apiJValue){
    length++;
  }
  return length;
}

function getDetailApi(apiJValue){
  const images="/images";
  return({
    "id":apiJValue["id"],
    "releaseName":apiJValue["name"],
    "DetailImgSrc":app.globalData.creeperUrl+images+apiJValue["main_img_url"],
    "detailText":apiJValue["summary"],
    "publisherName":apiJValue["userinfo"]["nickname"],
    "publisherImgSrc":app.globalData.creeperUrl+apiJValue["userinfo"]["img_url"],
    "releaseTime":apiJValue["create_time"]
  })
}

function getMoreDetails(apiJValue){
  const images="/images";
  var imgAry=new Array();
  for(var i in apiJValue["imgs"]){
    imgAry[i]={
      "imgId": apiJValue["imgs"][i]["id"],
      "imgSrc": app.globalData.creeperUrl+images+apiJValue["imgs"][i]["imgUrl"]["url"],
    }
  }
  console.log(imgAry);
  return({
    "name":apiJValue["name"],
    "time":apiJValue["create_time"],
    "price":apiJValue["price"],
    "detail":apiJValue["summary"],
    "nickName":apiJValue["userinfo"]["nickname"],
    "imgArray": imgAry
  });
}

module.exports={
  getRecentProductUrl:getRecentProductUrl,
  getRecentProductApi:getRecentProductApi,
  getRecentNameApi:getRecentNameApi,
  JudgeSum:JudgeSum,
  getDetailApi:getDetailApi,
  getMoreDetails:getMoreDetails
}