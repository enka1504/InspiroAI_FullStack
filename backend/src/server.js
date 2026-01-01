import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from "@clerk/express";

import connectToDb from './config/db.js';
import testRoute from './routes/test.route.js';
import articleRoute from './routes/article.route.js'

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
    credentials: true,
  })
);


app.use(clerkMiddleware());
connectToDb();

app.get('/health', (req, res) => {
  res.send('Server is Live');
});




app.use('/api/test', testRoute);
app.use('/api/article', articleRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});