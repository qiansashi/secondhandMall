function getBannerId(bannerId){
  const banner = "/banner"; 
  if(bannerId == 1 || bannerId == 2){
    return banner+"?id="+bannerId;
  }else{
    console.log("未找到banner路径");
  }
};

module.exports={
  getBannerId:getBannerId
};