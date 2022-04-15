import { Router } from "express";
import { Authorization } from "../../middleware/authorization.js";
import { CollectionModel } from "../../models/collection.js";
import { TaskModel } from "../../models/task.js";
import { UserModel } from "../../models/user.js";

export const DeleteCollectionRoute = Router();

DeleteCollectionRoute.delete('/delete/collection/:id', Authorization, async (req, res) => {

    try
    {
        const { id } = req.params;

        const collection = await CollectionModel.findById({ _id: id });

        if(!collection)
        {
            res.status(404).send("Collection Not Found");
        }

        await TaskModel.deleteMany({ collectionId: collection._id });

        // Get user
        const user = await UserModel.findById({ _id: req.userId });

        if(!user)
        {
            res.status(400).send("Bad Request");
        }

        user.collections.pull(collection._id);
        await user.save();

        await collection.remove();

        res.status(200).send();
    }
    catch(err)
    {
        res.status(500).send("Internal Server Error!");
    }
})