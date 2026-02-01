import express from "express"
import { loginValidation, signUpValidation } from "../middlewares/AuthValidation.js"
import  { login,signup } from "../controllers/authController.js"
import ensureAuthenticated from "../middlewares/Auth.js"

const Router = express.Router()

Router.post("/signup",signUpValidation,signup)
Router.post("/login",loginValidation,login)

Router.post("/logout", ensureAuthenticated, (req, res) => {
  return res.json({ message: "Logged out successfully" });
});



export default Router