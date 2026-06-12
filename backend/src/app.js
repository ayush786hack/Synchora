import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import { createServer } from 'node:http';
import {Server} from 'socket.io';
import mongoose from 'mongoose';


dotenv.config();
const app=express();
const server=createServer(app);
const io=new Server(server);


app.set("port",process.env.PORT || 8000);

app.get('/',(req,res)=>{
    res.send('Hello World');
});

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        server.listen(app.get("port"), () => {
            console.log(
                `Server is running on port ${app.get("port")}`
            );
        });

    } catch (error) {
        console.error(error);
    }
};

start();