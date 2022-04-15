import { ConnectDB } from "./db.js";
import { ExpressServer } from "./server.js";

const PORT = 3000;
export const JWT_SECRET = "skduncfh847gf83w47fhw8cw994";


const app = async () => {
    try
    {
        await ConnectDB();

        const server = ExpressServer();

        server.listen(PORT, () => {
            console.log(`Server is up at localhost:${PORT} 🚀`);
        })
    }
    catch(err)
    {
        throw new Error('Failed to start server', err);
    }
}


app();