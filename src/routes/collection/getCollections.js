import { Router } from "express";
import { Authorization } from "../../middleware/authorization.js";
import { CollectionModel } from "../../models/collection.js";

export const GetCollectionsRoute = Router();

GetCollectionsRoute.get('/collections', Authorization, async (req, res) => {

    try
    {
        const userId = req.userId;

        const collections = await CollectionModel.find({ user: userId }).sort({ 'updatedAt': -1 }).populate("tasks").exec();

        // Check if user exists, if not send bad request
        if(!collections)
        {
            return res.status(400).end("Bad Request");
        }

        res.status(200).send(collections);
    }
    catch(err)
    {
        res.status(500).end("Internal Server Error!");
    }
})