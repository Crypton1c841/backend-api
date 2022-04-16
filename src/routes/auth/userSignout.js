import { Router } from "express";
import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken";
import { UserModel } from "../../models/user.js";
import { SessionModel } from "../../models/session.js";
import { JWT_SECRET } from "../../app.js";
import { Authorization } from "../../middleware/authorization.js";

export const UserSignOutRoute = Router();

UserSignOutRoute.post('/signout', Authorization, async (req, res) => {
    try
    {
        const userId = req.userId;

        // find session based on useriD
        let session = await SessionModel.findOne({ "user": userId });

        if(!session)
        {
            res.status(400).send("Bad Request!")
        }

        await session.remove();


        res.status(200).send();
    }
    catch(err)
    {
        res.status(500).end(err);
    }
})