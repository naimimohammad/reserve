const express = require('express');
const router = new express.Router;
const Days = require('../../controller/days');
const Users = require('../../controller/users');
const Reserves = require('../../controller/reserves');
const SMS = require('../../controller/sms')
const init = require('../../controller/init')
const views = require('../../controller/views')
var jwt = require('express-jwt');

router.get('/',(req,res)=>res.send('ok'));
// user routes
router.post('/api/days/create',Days.create);
// router.post('/api/users/create',Users.create);
router.post('/api/reserves/create',Reserves.create);
router.post('/api/sms/send',SMS.send_code);
router.post('/api/sms/verify',SMS.verify_code);
router.get('/api/days/all',Days.get);
router.get('/api/users/get',Users.get_user);
router.post('/api/reserves/get',Reserves.get_reserve);
router.get('/api/reserves/all',Reserves.get_all);
router.get('/api/init/get',init.get_init);
router.get('/api/view/set',views.viwe);
router.get('/api/view/get',views.get_num);
router.post('/api/admin/login',init.verify);
module.exports = router;