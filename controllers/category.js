const Category=require('../models/category');
module.exports={
    insert: async function(req,res,next){
        try{
            const name=req.body.name;
            if(!name){
                res.json({code: 0,message: 'args empty'});
                return
            };
            const data=await Category.create({name});
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e)
            res.json({code:0,message: 'network error'});
        }
    },
    index: async function(req,res,next){
        try{
            const data=await Category.find({});
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
            const updated_at=Date.now();
            if(!name){
                res.json({code: 0,message: 'args empty'});
                return
            };
            const data=await Category.update({_id},{
                $set: {name,updated_at}
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
            const data=await Category.deleteOne({_id});
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    }
}