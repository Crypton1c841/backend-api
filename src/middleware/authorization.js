import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../app.js";
import { SessionModel } from "../models/session.js";
import { UserModel } from "../models/user.js";

export const Authorization = async (req, res, next) => {
    try
    {
        // Extract token
        const token = req.header("Authorization").replace("Bearer ", "");

        // verify if token exists in sessions collection
        const session = await SessionModel.findOne({ "token": token });

        if(!session)
        {
            return res.status(401).end("Unauthorized Request");
        }
            
        // Verify token
        const decodedToken = jwt.verify(token, JWT_SECRET);

        // Check if token is not valid
        if(!decodedToken)
        {
            return res.status(401).end("Unauthorized Request");
        }

        // If token is valid, get user based on decoded token data
        const user = await UserModel.findById({ _id: decodedToken._id });

        // Check if user exists, if not send bad request
        if(!user)
        {
            return res.status(401).end("Unauthorized Request");
        }

        req.userId = user._id;
        next();

    }
    catch(err)
    {
        res.status(500).end("Internal Server Error");
    }
}