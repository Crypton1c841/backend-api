import express from 'express';
import { UserSignInRoute } from './routes/auth/userSignin.js';
import { UserSignOutRoute } from './routes/auth/userSignout.js';
import { UserSignUpRoute } from './routes/auth/userSignup.js';
import { CreateCollectionRoute } from './routes/collection/createCollection.js';
import { DeleteCollectionRoute } from './routes/collection/deleteCollection.js';
import { GetCollectionsRoute } from './routes/collection/getCollections.js';
import { UpdateCollectionRoute } from './routes/collection/updateCollection.js';
import { CreateTaskRoute } from './routes/task/createTask.js';
import { DeleteTaskRoute } from './routes/task/deleteTask.js';
import { GetTasksRoute } from './routes/task/getTasks.js';
import { UpdateTaskRoute } from './routes/task/updateTask.js';


export const ExpressServer = () => {

    const server = express();
    server.use(express.json());

    // Routes
    server.use(UserSignUpRoute);
    server.use(UserSignInRoute);
    server.use(UserSignOutRoute);
    server.use(CreateCollectionRoute);
    server.use(GetCollectionsRoute);
    server.use(UpdateCollectionRoute);
    server.use(DeleteCollectionRoute);
    server.use(CreateTaskRoute);
    server.use(GetTasksRoute);
    server.use(UpdateTaskRoute);
    server.use(DeleteTaskRoute);

    return server;

}

