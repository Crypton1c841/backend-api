import { Router } from "express";
import { Authorization } from "../../middleware/authorization.js";
import { CollectionModel } from "../../models/collection.js";
import { TaskModel } from "../../models/task.js";

export const CreateTaskRoute = Router();

CreateTaskRoute.post('/create/:collectionId/task', Authorization, async (req, res) => {

    try
    {
        const userId = req.userId; 
        const collectionId = req.params.collectionId;
        const { text } = req.body;

        const collection = await CollectionModel.findOne({ _id: collectionId, user: userId });

        if(!collection)
        {
            res.status(404).send("Collection Does Not Exists")
        }

        const task = new TaskModel({ text, collectionId: collection._id, completed: false });
        await task.save();

        if(!task)
        {
            throw new Error("Unable to Save Task");
        }

        collection.tasks.push(task._id);
        await collection.save();
        

        res.status(201).send(task);
    }
    catch(err)
    {
        res.status(500).send("Internal Server error")
    }
    
})