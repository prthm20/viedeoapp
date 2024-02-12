import { Router } from "express";
import {upload} from "../middlewears/multer.middlewear.js"
import { registerUser } from "../controllers/user.controller.js";

const router=Router();

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser);

export { router}