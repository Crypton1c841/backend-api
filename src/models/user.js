import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        max: 32
    },
    lastName: {
        type: String,
        required: true,
        max: 32
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String,
        min: 8
    },
    collections: [
        {
            ref: 'Collection',
            type: mongoose.Schema.Types.ObjectId
        }
    ],
});


// Moongoose Middleware to Hash password before saving to collection
UserSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password'))
    {
        user.password = await bcryptjs.hash(user.password, 8);
    }

    next();
})


export const UserModel = mongoose.model('User', UserSchema);