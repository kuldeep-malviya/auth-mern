import {Router} from "express"
import { GetProducts, createprod } from "../controllers/Products.controller.js";
import { upload } from "../middlewares/multer.js";

export const router = Router();

router.get("/",GetProducts)
<<<<<<< HEAD
router.post("/crp",upload.single("image"),createprod)
=======
router.post("/crp",upload.single("image"),createprod)
>>>>>>> e0a1ba9d0ba3d3ee26bd3b63d49ce83d0c516451
