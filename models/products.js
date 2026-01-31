import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imagesUrl:{
         type:String,
        required:true,
    }
    ,
    Price:{
         type:Number,
        required:true,
    }
},{timestamps:true})

<<<<<<< HEAD
export const productModel = mongoose.model("product",ProductsSchema);
=======
export const productModel = mongoose.model("product",ProductsSchema);
>>>>>>> e0a1ba9d0ba3d3ee26bd3b63d49ce83d0c516451
