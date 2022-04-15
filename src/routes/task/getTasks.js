import { Router } from "express";
import { Authorization } from "../../middleware/authorization.js";
import { CollectionModel } from "../../models/collection.js";
import { TaskModel } from "../../models/task.js";

export const GetTasksRoute = Router();

GetTasksRoute.get('/:collectionId/tasks', Authorization, async (req, res) =>{
    try
    {   
        const userId = req.userId;
        const collectionId = req.params.collectionId;

        const collection = await CollectionModel.findOne({ _id: collectionId, user: userId });

        if(!collection)
        {
            res.status(404).send("Collection does not Exists");
        }

        const tasks = await TaskModel.find({ collectionId: collection._id });

        if(!tasks)
        {
            res.status(404).send("Task does not exists with the associated collection");
        }

        res.status(200).send(tasks)

    }
    catch(err)
    {
        res.status(500).send("Internal Server Error")
    }
})