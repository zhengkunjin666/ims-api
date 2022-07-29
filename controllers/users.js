const Users=require('../models/users');
const authCodeFunc=require('../utils/authCode');
module.exports={
    insert: async function(req,res,next){
        try{
            const phone=req.body.phone;
            const password=req.body.password;
            if(!phone || !password){
                res.json({code: 0,message: 'args empty'});
                return
            };
            const users=await Users.find({phone});
            if(users[0]){
                res.json({code: 0,data: "此用户已存在，请换个号码注册！"});
                return
            };
            const data=await Users.create({phone,password});
            res.json({code: 200,data: "注册成功！"})
        }catch(e){
            console.log(e)
            res.json({code:0,message: 'network error'});
        }
    },
    login: async function(req,res,next){
        let phone=req.body.phone;
        let password=req.body.password;
        if(!phone || !password){
            res.json({code: 0,message: 'args empty'});
            return
        };
        try{
            const users=await Users.find({phone});
            if(users[0]){
                for(let i=0;i<users.length;i++){
                    if(users[i].password==password){
                        let user=users[i];
                        let auth_Code=phone+'\t'+password+'\t'+user._id;
                        auth_Code=authCodeFunc(auth_Code,'ENCODE');
                        res.cookie('ims',auth_Code,{maxAge: 24*60*60*1000});
                        res.json({code: 200,data: "登录成功！"})
                    }
                }
            }else{
                res.json({code: 0,data: "登录失败，没有此用户！"})
            }
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    },
    index: async function(req,res,next){
        try{
            const data=await Users.find({});
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e)
            res.json({code:0,message: 'network error'});
        }
    },
    update: async function(req,res,next){
        try{
            const _id=req.params.id;
            const phone=req.body.phone;
            const password=req.body.password;
            const updated_at=Date.now();
            if(!phone || !password){
                res.json({code: 0,message: 'args empty'});
                return
            };
            const data=await Users.update({_id},{
                $set: {phone,password,updated_at}
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
            const data=await Users.deleteOne({_id});
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    }
}