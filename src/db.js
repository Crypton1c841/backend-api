import mongoose from "mongoose";

export const ConnectDB = async() => {
    try
    {
        await mongoose.connect('mongodb+srv://sumanth:abcd1234@mongodb.zreoc.mongodb.net/TodoDB?retryWrites=true&w=majority');
        console.log('Database connection established!');
    }
    catch(e)
    {
        console.log("Unable to establish Database Connection", e);
    }
}