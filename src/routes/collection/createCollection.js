import { Router } from "express";
import { Authorization } from "../../middleware/authorization.js";
import { CollectionModel } from "../../models/collection.js";
import { UserModel } from "../../models/user.js";

export const CreateCollectionRoute = Router();

CreateCollectionRoute.post('/create/collection', Authorization, async (req, res) => {

    try
    {
        const userId = req.userId;

        // Create a collection for the current userId
        let { name } = req.body;
        const collection = await new CollectionModel({ name, user: userId }).save();

        if(!collection)
        {
            throw new Error("Erro saving");
        }

        // If token is valid, get user based on decoded token data
        const user = await UserModel.findById({ _id: userId });

        // Check if user exists, if not send bad request
        if(!user)
        {
            throw new Error("Erro saving");
        }

        // if collection created successfully, assign collection id to user collections field
        user.collections.push(collection._id);
        await user.save();

        res.status(201).send(collection);
    }
    catch(err)
    {
        res.status(500).send('Internal Server Error!');
    }
})
