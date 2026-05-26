import express from 'express';
import 'dotenv/config';
import feedRouter from './routes/feedRoutes.js';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import connectDb from './config/mongodb.js';
import bookmarkRouter from './routes/bookmarkRoutes.js';
import interactionRouter from './routes/interactionRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

// database
connectDb();

// api endpoints

app.use('/api', feedRouter);
app.use('/api', userRouter);
app.use('/api/bookmark', bookmarkRouter);
app.use('/api/interaction', interactionRouter);

const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    console.log(`sever is listening on ${port}`);

})

