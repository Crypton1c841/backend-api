import { Router } from "express";
import { Authorization } from "../../middleware/authorization.js";
import { CollectionModel } from "../../models/collection.js";

export const GetCollectionsRoute = Router();

GetCollectionsRoute.get('/collections', Authorization, async (req, res) => {

    try
    {
        const userId = req.userId;

        const collections = await CollectionModel.find({ user: userId }).select("-tasks");

        // Check if user exists, if not send bad request
        if(!collections)
        {
            throw new Error("Bad Request")
        }

        res.status(200).send(collections);
    }
    catch(err)
    {
        res.status(500).send("Internal Server Error!");
    }
})