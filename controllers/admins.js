const Admins=require('../models/admins');
const authCodeFunc=require('../utils/authCode');
module.exports={
    insert: async function(req,res,next){
        try{
            const name=req.body.name;
            const phone=req.body.phone;
            const password=req.body.password;
            if(!name || !phone || !password){
                res.json({code: 0,message: 'args empty'});
                return
            };
            const admins=await Admins.find({phone});
            if(admins[0]){
                res.json({code: 0,data: "此用户已存在，请换个号码注册！"});
                return
            };
            const data=await Admins.create({name,phone,password});
            res.json({code: 200,data: "注册成功！"})
        }catch(e){
            console.log(e)
            res.json({code:0,message: 'network error'});
        }
    },
    login: async function(req,res,next){
        let name=req.body.name;
        let phone=req.body.phone;
        let password=req.body.password;
        if(!name || !phone || !password){
            res.json({code: 0,message: 'args empty'});
            return
        };
        try{
            const admins=await Admins.find({name});
            if(admins[0]){
                for(let i=0;i<admins.length;i++){
                    if(admins[i].phone==phone && admins[i].password==password){
                        let admin=admins[i];
                        let auth_Code=name+'\t'+phone+'\t'+password+'\t'+admin._id;
                        auth_Code=authCodeFunc(auth_Code,'ENCODE');
                        res.cookie('imsAdmin',auth_Code,{maxAge: 24*60*60*1000});
                        res.json({code: 200,data: "登录成功！"});
                    }
                }
            }else{
                res.json({code: 0,data: "登录失败，没有此管理员！"})
            }
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    },
    index: async function(req,res,next){
        try{
            const data=await Admins.find({});
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e)
            res.json({code:0,message: 'network error'});
        }
    },
    update: async function(req,res,next){
        try{
            const _id=req.params.id;
            const name=req.body.name;
            const phone=req.body.phone;
            const password=req.body.password;
            const updated_at=Date.now();
            if(!name || !phone || !password){
                res.json({code: 0,message: 'args empty'});
                return
            };
            const data=await Admins.update({_id},{
                $set: {name,phone,password,updated_at}
            });
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    },
    delete: async function(req,res,next){
        try{
            const _id=req.params.id;
            const data=await Admins.deleteOne({_id});
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    }
}