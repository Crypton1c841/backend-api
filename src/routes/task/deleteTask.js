import { Router } from "express";
import { Authorization } from "../../middleware/authorization.js";
import { CollectionModel } from "../../models/collection.js";
import { TaskModel } from "../../models/task.js";

export const DeleteTaskRoute = Router();

DeleteTaskRoute.delete('/:collectionId/task/:taskId', Authorization, async (req, res) => {

    try
    {
        const userId = req.userId;
        const collectionId = req.params.collectionId;
        const taskId = req.params.taskId;

        const collection = await CollectionModel.findOne({ _id: collectionId, user: userId });

        if(!collection)
        {
            res.status(404).send("Collection does not Exists");
        }

        const task = await TaskModel.findOne({ _id: taskId, collectionId: collection._id });

        if(!task)
        {
            res.status(404).send("Task not found!");
        }

        await task.remove();

        res.status(200).send(task);
    }
    catch(err)
    {
        res.status(500).end("Internal Server Error!");
    }
})