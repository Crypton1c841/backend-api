import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        required: true,
        type: String,
        max: 100
    },
    tasks: {
        ref: 'Task',
        type: mongoose.Schema.Types.ObjectId
    }
});

export const CollectionModel = mongoose.model('Collection', CollectionSchema);