var express = require('express');
var router = express.Router();
const ofertasController = require('../controllers/ofertasController')


router.get('/', ofertasController.list);//read
router.get('/add', ofertasController.add);
router.post('/add', ofertasController.addPost);//create
router.get('/edit/:id',ofertasController.edit)
router.post('/edit',ofertasController.editPost)//Update
router.post('/delete',ofertasController.delete)//delete
router.get('/delete',ofertasController.deleteDirect)

/* Api para react*/
router.get('/hotelesAll',ofertasController.all)
module.exports = router;
