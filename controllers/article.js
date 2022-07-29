const Article = require("../models/article");

module.exports={
    insert: async function(req,res,next){
        try{
            const name=req.body.name;
            const description=req.body.description;
            const content=req.body.content;
            const category_id=req.body.category_id;
            const visits=0;
            if(!name || !description || !content || !category_id){
                res.json({coded: 0,message: 'args empty'});
                return
            };
            const data=await Article.create({name,description,content,category_id,visits});
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    },
    index: async function(req,res,next){
        try{
            const data=await Article.find().populate('category_id');
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    },
    show: async function(req,res,next){
        try{
            const _id=req.params.id;
            let visitsArr=await Article.find({_id});
            let visits=visitsArr[0].visits+1;
            await Article.update({_id},{$set: {visits}});
            const data=await Article.find({_id}).populate('category_id');
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    },
    update: async function(req,res,next){
        try{
            const name=req.body.name;
            const description=req.body.description;
            const content=req.body.content;
            const category_id=req.body.category_id;
            const _id=req.params.id;
            const updated_at=Date.now();
            if(!name || !description || !content || !category_id){
                res.json({code: 0,message: 'args empty'});
                return
            };
            const data=await Article.update({_id},{
                $set: {name,description,content,category_id,updated_at}
            });
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    },
    delete: async function(req,res,next){
        try{
            const name=req.body.name;
            const _id=req.params.id;
            const data=await Article.deleteOne({_id});
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    }
}