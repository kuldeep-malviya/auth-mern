import mongoose from "mongoose";

const mongo_url = process.env.MONGODB_URL

const connectdb = async () => {
    await  mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("mongodb connected successfully")
    })
    .catch((error)=>{
        console.log("mongodb connetion error!!",error)
    })
    
}

export default connectdb