const express = require('express');
const router = express.Router();

const commonController = require('../Controllers/common.js')

router.get('/getAllProducts', commonController.getAllProducts);
router.post('/saveProduct/', commonController.saveProduct);
router.post('/saveProduct/:id', commonController.saveProduct);
router.get('/getFilteredProducts', commonController.getFilteredProducts);
router.get('/getProductsBasedOnSearch', commonController.getProductsBasedOnSearch);


router.get('/', function(req, res, next) {
    res.send('All Good');
  });

module.exports = router;
