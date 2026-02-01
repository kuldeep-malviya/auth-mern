import express from "express"
import dotenv from "dotenv"
import  Router  from "./routes/authRouter.js"
import cors from "cors"
dotenv.config()
import connectdb from "./models/DB.js"
import productRouter from "./routes/productRouter.js"
import { router } from "./routes/getProducts.js"
import cartRouter from "./routes/cartRoutes.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors( ))    
app.use("/uploads", express.static("uploads"));

app.use("/auth",Router)
app.use("/products",router)
app.use("/cart",cartRouter)
connectdb()
const port = process.env.PORT || 4000
app.get('/kuldeep',(req,res)=>{
    res.send("this is kulddep"
    )
})
app.get('/radha',(req,res)=>{
    res.send("jay jay shree radha"
    )
})

app.listen(port ,()=>{
    console.log(`server is ruuning at http://localhost:${port}`)
})
