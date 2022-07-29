const authCodeFunc=require('../utils/authCode');
module.exports=function(req,res,next){
    res.locals.isLogin=false;
    res.locals.userInfo={};
    let auth_Code=req.cookies.ims;
    if(auth_Code){
        auth_Code=authCodeFunc(auth_Code,'DECODE').str;
        authArr=auth_Code.split("\t");
        let phone=authArr[0];
        let password=authArr[1];
        let id=authArr[2];
        res.locals.isLogin=true;
        res.locals.userInfo={
            phone,password,id
        }
    };
    next();
}