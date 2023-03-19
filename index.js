import express from "express";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import userRouter from "./routes/user-routes.js";
import blogRouter from './routes/blog-routes.js';

const PORT = 3004;
const app = express();

app.use( bodyParser.json());
app.use('/api/user', userRouter);
app.use('/api/blog/', blogRouter);

const url = `mongodb+srv://dbConrad:kEprNGRbUnfc3men@cluster0.0v1vx.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(url).then(() => {
    app.listen(PORT, () => {
        console.log(`Server started... \n Database connected... \n listening on ${PORT}`);
    });
}).catch((error) => {
    console.log(error);
})
