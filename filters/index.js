module.exports=function(app){
    app.use(require('./adminsLoginFilter'));
    app.use(require('./loginFilter'));
    app.use(require('./initFilter'));
};