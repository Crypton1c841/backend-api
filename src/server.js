import express from 'express';
import { UserSignInRoute } from './routes/auth/userSignin.js';
import { UserSignUpRoute } from './routes/auth/userSignup.js';
import { CreateCollectionRoute } from './routes/collection/createCollection.js';
import { DeleteCollectionRoute } from './routes/collection/deleteCollection.js';
import { GetCollectionsRoute } from './routes/collection/getCollections.js';
import { UpdateCollectionRoute } from './routes/collection/updateCollection.js';


export const ExpressServer = () => {

    const server = express();
    server.use(express.json());

    // Routes
    server.use(UserSignUpRoute);
    server.use(UserSignInRoute);
    server.use(CreateCollectionRoute);
    server.use(GetCollectionsRoute);
    server.use(UpdateCollectionRoute);
    server.use(DeleteCollectionRoute);

    return server;

}

