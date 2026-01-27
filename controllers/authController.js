import userModel from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const signup = async (req,res) =>{
    try {
        const {name,email,password} = req.body;
        const user = await userModel.findOne({email})
        if(user){
           return res.status(409).json({message:"user already exist,you can login",success:false})
        }
        const newUser = new userModel({name,email,password})
        newUser.password = await bcrypt.hash(password,10)
        await  newUser.save()
        res.status(201)
        .json({message:"signup successfully",success:true})
    } catch (error) {
        res.status(500)
        .json({message:"internal server error",success:false})
    }
}

const login = async (req,res) => {
    try {
        const {email,password} = req.body;
    const user = await userModel.findOne({email})
    const errorMsg = "auth failed email and password is wrong";
    if(!user){
       return res.status(401).json({message:errorMsg,success:false});
    }
    const isPassEqual = await bcrypt.compare(password,user.password);
    if(!isPassEqual){
      return res.status(401).json({message:errorMsg,success:false})
    }
    const jwtToken = jwt.sign({email:user.email , _id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.status(200).json({message:"login successfully",
        jwtToken,
        email,
        name:user.name,
        success:true
    })
    } catch (error) {
         res.status(500)
        .json({message:"internal server error",success:false})
    }
}

export  {signup,login}