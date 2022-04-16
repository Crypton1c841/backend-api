import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../app.js';
import { SessionModel } from '../../models/session.js';
import { UserModel } from '../../models/user.js';

export const UserSignUpRoute = Router();

UserSignUpRoute.post('/signup', async (req, res) => {
    try
    {
        let { email, password, firstName, lastName } = req.body;

        const user = await new UserModel({
            email,
            password,
            firstName,
            lastName
        }).save();

        if(!user)
        {
            throw new Error("Internal Server Error")
        }
        
        // Generate Token
        let token = jwt.sign({ _id: user._id }, JWT_SECRET);


        // Link user with session and save
        let session = await new SessionModel({ token, user: user._id }).save()

        if(!session)
        {
            throw new Error("Internal Server Error")
        }

        let response  = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: session.token
        }

        return res.status(201).send(response);
    }
    catch(err)
    {
        res.status(500).end("Internal Server Error!");
    }
})