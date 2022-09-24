const model = require('../Models');
const mongoose = require('mongoose');

async function saveProduct(data) {
    await new model.Product(data).save();
}

async function updateProduct(data, id) {
    return await model.Product.updateOne({ _id: mongoose.Types.ObjectId(id) }, { $set: data },); // { upsert: true }
}

async function getAllProducts(data) {
    let result = await model.Product.aggregate([
        {
            $skip: parseInt(data.offSet)
        },
        { $limit: 12 },

    ]);
    return result;
}

const getProductsBasedOnSearch = async function (data) {
    // let ff = new RegExp('^' + emailOrUsername.data + '$', 'i');
    // return await model.Product.find({
    //     where: {
    //         // Name: {$regex: ff}
    //         Name: {$regex: `/${emailOrUsername.data}/`, $options: 'i' }
    //     }
    // }
    // );
    let condition = !data.serchValue ? [{
        $skip: parseInt(data.offSet)
    },
    { $limit: 12 }] : []
    try {
        return await model.Product.aggregate([
            {
                $match: {
                    Name: {
                        $regex: `^${data.serchValue}`,
                        $options: "i"
                    }
                }
            },
            ...condition
        ])
    } catch (error) {
        console.log(error);
    }

}

async function getFilteredProducts() {
    let result = await model.Product.find({});
    return result;
}

module.exports = {
    getAllProducts,
    saveProduct,
    updateProduct,
    getFilteredProducts,
    getProductsBasedOnSearch,
}