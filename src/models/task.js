import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        min: 1,
        max: 1000
    },
    completed: Boolean,
    collectionId: {
        ref: 'Collection',
        type: mongoose.Schema.Types.ObjectId
    }
});

export const TaskModel = mongoose.model('Task', taskSchema);