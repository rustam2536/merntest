const commonDao = require('../Dao/common.js')

module.exports.getAllProducts = async function (req, res) {
    try {
        let allProducts = await commonDao.getAllProducts(req.query);
        res.status(200).json({ allProducts: allProducts, message: 'success' });
    }
    catch (error) {
        res.status(400).json({ message: 'error' });
    }
}

module.exports.saveProduct = async function (req, res) {
    try {
        let message = 'Product Added SuccessFully!'
        if(req.query && req.query.id){
            message = 'Product Updated SuccessFully!'
            commonDao.updateProduct(req.body, req.query.id);
        } else{
            commonDao.saveProduct(req.body);
        }
        res.status(200).json({ message: message });
    }
    catch (error) {
        res.status(400).json({ message: message });
    }
}

module.exports.getFilteredProducts = async function (req, res) {
    try {
        let products = await commonDao.getFilteredProducts();        
        res.status(200).json({ products: products, message: 'success' });
    }
    catch (error) {
        res.status(400).json({ message: 'error' });
    }
}

module.exports.getProductsBasedOnSearch = async function (req, res) {
    try {
        let products = await commonDao.getProductsBasedOnSearch(req.query);
        res.status(200).json({ products: products, message: 'success' });
    }
    catch (error) {
        res.status(400).json({ message: 'error' });
    }
}

