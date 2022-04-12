import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    token: {
        required: true,
        type: String
    },
    user: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
});

export const SessionModel = mongoose.model('Session', SessionSchema);