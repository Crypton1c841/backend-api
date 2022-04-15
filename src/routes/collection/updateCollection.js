import { Router} from "express";
import { Authorization } from "../../middleware/authorization.js";
import { CollectionModel } from "../../models/collection.js";

export const UpdateCollectionRoute = Router();

UpdateCollectionRoute.patch("/update/collection/:id", Authorization, async (req, res) => {

    try
    {
        const { id } = req.params;
        const { name } = req.body;

        const collection = await CollectionModel.findById({ _id: id });

        if(!collection)
        {
            res.status(404).send("Collection Not Found");
        }

        collection.name = name;
        await collection.save();

        res.status(200).send(collection);
    }
    catch(err)
    {
        res.status(500).send("Internal Server Error!");
    }
})