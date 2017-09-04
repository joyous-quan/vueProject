var express = require('express');
var router = express.Router();
var dataCtrl = require('../controllers/cate.controller');//引入控制器

router.get('/:type',dataCtrl.getall);

router.delete('/:id',dataCtrl.remove);
router.put('/data/:id',dataCtrl.update);//修改
router.post('/data',dataCtrl.create);

module.exports = router;