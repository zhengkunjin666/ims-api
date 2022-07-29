const Comment = require("../models/comment");

module.exports={
    insert: async function(req,res,next){
        try{
            const name=req.body.name;
            const targetName=req.body.targetName;
            const content=req.body.content;
            const article_id=req.body.article_id;
            if(!name ||  !content || !article_id){
                res.json({coded: 0,message: 'args empty'});
                return
            };
            const data=await Comment.create({name,targetName,content,article_id});
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    },
    index: async function(req,res,next){
        try{
            const data=await Comment.find().populate('article_id');
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    },
    delete: async function(req,res,next){
        try{
            const _id=req.params.id;
            const data=await Comment.deleteOne({_id});
            res.json({code: 200,data: data});
        }catch(e){
            console.log(e);
            res.json({code: 0,message: 'network error'});
        }
    }
}