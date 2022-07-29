const authCodeFunc=require('../utils/authCode');
module.exports=function(req,res,next){
    res.locals.isLogin=false;
    res.locals.userInfo={};
    let auth_Code=req.cookies.imsAdmin;
    if(auth_Code){
        auth_Code=authCodeFunc(auth_Code,'DECODE').str;
        authArr=auth_Code.split("\t");
        let name=authArr[0];
        let phone=authArr[1];
        let password=authArr[2];
        let id=authArr[3];
        res.locals.isLogin=true;
        res.locals.userInfo={
            name,phone,password,id
        }
    };
    next();
}