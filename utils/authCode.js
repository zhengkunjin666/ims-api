const JWT=require('jsonwebtoken');
const key='emhlbmdrdW5qaW7nmoRJTVPkv6Hmga/nrqHnkIbns7vnu58=';
const authcode=function(str,operation){
    operation ? operation : 'DECODE';
    if(operation == 'DECODE'){
        return JWT.verify(str,key);
    }else{
        return JWT.sign({str},key,{expiresIn: "30d"});
    }
}
module.exports=authcode;