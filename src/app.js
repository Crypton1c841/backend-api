import bcryptjs from "bcryptjs";
import express from "express";
import jwt from 'jsonwebtoken';
import { ConnectDB } from "./db.js";
import { Authorization } from "./middleware/authorization.js";
import { CollectionModel } from "./models/collection.js";
import { SessionModel } from "./models/session.js";
import { UserModel } from "./models/user.js";

const PORT = 3000;
export const JWT_SECRET = "skduncfh847gf83w47fhw8cw994";

ConnectDB();
const server = express();
server.use(express.json());

server.post('/signup', async (req, res) => {
    try
    {
        let { email, password, firstName, lastName } = req.body;

        const user = await new UserModel({
            email,
            password,
            firstName,
            lastName
        }).save()

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
        res.status(401).send(err);
    }
});


server.post('/signin', async (req, res) => {
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
        res.status(401).send(err);
    }
})

server.get('/collections', Authorization, async (req, res) => {

    try
    {
        const userId = req.userId;

        // If token is valid, get user based on decoded token data
        const user = await UserModel.findById({ _id: userId }).populate('collections').exec();

        // Check if user exists, if not send bad request
        if(!user)
        {
            throw new Error("Bad Request")
        }

        res.status(200).send(user.collections);
    }
    catch(err)
    {
        res.status(500).send("Internal Server Error!");
    }
})

server.post('/create/collection', Authorization, async (req, res) => {
    try
    {
        const userId = req.userId;

        // Create a collection for the current userId
        let { name } = req.body;
        const collection = await new CollectionModel({ name, user: userId }).save();

        if(!collection)
        {
            throw new Error("Erro saving");
        }

        // If token is valid, get user based on decoded token data
        const user = await UserModel.findById({ _id: userId });

        // Check if user exists, if not send bad request
        if(!user)
        {
            throw new Error("Erro saving");
        }

        // if collection created successfully, assign collection id to user collections field
        user.collections.push(collection._id);
        await user.save();

        res.status(201).send(collection);

    }
    catch(err)
    {
        res.status(500).send(err);
    }
})


server.listen(PORT, function() {
    console.log(`Server is up on localhost:${PORT}`);
});