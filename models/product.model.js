const mongoose = require('mongoose')

let productSchema = mongoose.Schema({
    name:String,
    price:{type : String , default : "0"},
    description: String
})

let Product = mongoose.model("products", productSchema);

module.exports = Product;