var express = require('express');
var router = express.Router();
var csrf=require('../middlewares/csrf');
var adminsController=require('../controllers/admins');
var usersController=require('../controllers/users');
var categoryController = require('../controllers/category');
var articleController = require('../controllers/article');
var commentController=require('../controllers/comment');

router.post('/admins',csrf.getToken,adminsController.insert);   //后台的注册
router.post('/admins/login',csrf.getToken,adminsController.login);  //后台的登录
router.get('/admins',csrf.setToken,adminsController.index);
router.put('/admins/:id',csrf.getToken,adminsController.update);
router.delete('/admins/:id',csrf.getToken,adminsController.delete);

router.post('/users',csrf.getToken,usersController.insert);   //用户的注册
router.post('/users/login',csrf.getToken,usersController.login);  //用户的登录
router.get('/users',csrf.setToken,usersController.index);
router.put('/users/:id',csrf.getToken,usersController.update);
router.delete('/users/:id',csrf.getToken,usersController.delete);

router.post('/category',csrf.getToken,categoryController.insert);
router.get('/category',csrf.setToken,categoryController.index);
router.put('/category/:id',csrf.getToken,categoryController.update);
router.delete('/category/:id',csrf.getToken,categoryController.delete);

router.post('/article',csrf.getToken,articleController.insert);
router.get('/article',csrf.setToken,articleController.index);
router.get('/article/:id',csrf.setToken,articleController.show);
router.put('/article/:id',csrf.getToken,articleController.update);
router.delete('/article/:id',csrf.getToken,articleController.delete);

router.post('/comment',csrf.getToken,commentController.insert);
router.get('/comment',csrf.setToken,commentController.index);
router.delete('/comment/:id',csrf.getToken,commentController.delete);

module.exports = router;
