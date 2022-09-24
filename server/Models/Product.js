const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collectionSchema = new Schema({
    Name: { type: String },
    Category: { type: String },
    buyPrice: { type: Number },
    sellPrice: { type: Number },
}, { timestamps: true });
let collectionName = "Product"

module.exports = { collectionSchema, collectionName }