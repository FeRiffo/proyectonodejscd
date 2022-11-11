var express = require('express');
var router = express.Router();
const paquetesController = require('../controllers/paquetesController')


router.get('/', paquetesController.list);//read
router.get('/add', paquetesController.add);
router.post('/add', paquetesController.addPost);//create
router.get('/edit/:id',paquetesController.edit)
router.post('/edit',paquetesController.editPost)//Update
router.post('/delete',paquetesController.delete)//delete
router.get('/delete',paquetesController.deleteDirect)

/* Api para react*/
router.get('/hotelesAll',paquetesController.all)
module.exports = router;