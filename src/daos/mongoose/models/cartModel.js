import mongoose from "mongoose";

const cartCollection = 'carts'

const cartSchema = new mongoose.Schema({
    products: [
        
    ]
},
    {
        timestamps: true,
    })

export const cartModel = mongoose.model(cartCollection, cartSchema)