module.exports=function(req,res,next){
    res.locals.seo={
        title: 'MongoDB IMS API',
        keywords: 'MongoDB、IMS、API',
        description: 'Welcome use MongoDB IMS API'
    };
    next();
}