import { Router } from "express";
import bcryptjs from "bcryptjs"; 
import jwt from "jsonwebtoken"
import { UserModel } from "../../models/user.js";
import { SessionModel } from "../../models/session.js";
import { JWT_SECRET } from "../../app.js";

export const UserSignInRoute = Router();

UserSignInRoute.post('/signin', async (req, res) => {
    try
    {
        // Get Email and password from req.body
        let { email, password  } = req.body;

        // find user based on email
        const user = await UserModel.findOne({ "email": email })

        // Compare password with bcrypt
        if(!user)
        {
            throw new Error("User Not Found");
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if(!isMatch)
        {
            throw new Error('Invalid Credentials');
        }

        // Generate Token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET);

        // find session based on useriD
        let session = await SessionModel.findOne({ "user": user._id });


        // if session doesn't exist create new session
        if(!session)
        {
            session = await new SessionModel({ token, user: user._id }).save();
        } 
        else // if session exists, replace token
        {
            session.token = token;
            await session.save();
        }

        // Send response
        let response = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: session.token
        }

        res.status(200).send(response);
    }
    catch(err)
    {
        res.status(500).end(err);
    }
})