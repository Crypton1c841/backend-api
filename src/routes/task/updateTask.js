import { Router } from "express";
import { Authorization } from "../../middleware/authorization.js";
import { CollectionModel } from "../../models/collection.js";
import { TaskModel } from "../../models/task.js";

export const UpdateTaskRoute = Router();

UpdateTaskRoute.patch('/:collectionId/task/:taskId', Authorization, async (req, res) => {

    try
    {
        const userId = req.userId;
        const collectionId = req.params.collectionId;
        const taskId = req.params.taskId;
        const { text, completed } = req.body;

        const collection = await CollectionModel.findOne({ _id: collectionId, user: userId });

        if(!collection)
        {
            res.status(404).send("Collection does not Exists");
        }

        const task = await TaskModel.findById({ _id: taskId });

        if(!task)
        {
            res.status(404).send("Task not found!");
        }

        task.text = text;
        task.completed = completed;

        await task.save();

        res.status(200).send(task);


    }
    catch(err)
    {
        res.status(500).send("Internal Server Error!");
    }
})