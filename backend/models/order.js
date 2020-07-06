var mongoose = require('mongoose')
var Schema = mongoose.Schema
var {
    ObjectId
} = mongoose.Schema


const orderSchema = new Schema({
    products: [productCartSchema],
    transaction_id: {},
    amount: Number,
    address: String,
    updated: Date,
    user: {
        type: ObjectId,
        ref: "user"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Order", orderSchema)