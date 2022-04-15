import { Router } from "express";
import { Authorization } from "../../middleware/authorization.js";
import { UserModel } from "../../models/user.js";

export const GetCollectionsRoute = Router();

GetCollectionsRoute.get('/collections', Authorization, async (req, res) => {

    try
    {
        const userId = req.userId;

        // If token is valid, get user based on decoded token data
        const user = await UserModel.findById({ _id: userId }).populate('collections').exec();

        // Check if user exists, if not send bad request
        if(!user)
        {
            throw new Error("Bad Request")
        }

        res.status(200).send(user.collections);
    }
    catch(err)
    {
        res.status(500).send("Internal Server Error!");
    }
})