/************ Require's ************/
const express = require('express');
const router = express.Router();

/*** Middlewares ****/
const upload = require ('../middlewares/multerProductsMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/************ Controller Require ************/
const productosController = require('../controllers/productosController');
const validateProductCreateMiddleware = require('../middlewares/validateProductCreateMiddleware');
const validateProductEditMiddleware = require('../middlewares/validateProductEditMiddleware');

/*** GET ALL PRODUCTS ***/ 
router.get('/products', productosController.index);

/*** GET ONE PRODUCT ***/ 
router.get('/products/:id', productosController.detail);

/*** PRODUCT PANEL ***/
router.get('/panel', authMiddleware, productosController.panel);

/*** CREATE ONE PRODUCT ***/ 
router.get('/product-create-form', authMiddleware, validateProductCreateMiddleware, productosController.create);
router.post('/product-create', upload.single('img'), validateProductCreateMiddleware, productosController.store);

/*** EDIT ONE PRODUCT ***/ 
router.get('/product-edit-list', authMiddleware, validateProductEditMiddleware, productosController.editList);
router.get('/:id/product-edit-form', authMiddleware, validateProductEditMiddleware, productosController.edit); 
router.put('/:id/actualizar', upload.single('img'), validateProductEditMiddleware, productosController.update); 

/*** DELETE ONE PRODUCT***/ 
router.delete('/:id/delete', productosController.destroy); 

module.exports = router;