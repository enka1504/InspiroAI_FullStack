import express from 'express';
import 'dotenv/config';
import cors from 'cors';

import connectToDb from './config/db.js';
import articleRoute from './routes/article.route.js'
import blogRoute from './routes/blog.route.js'
import imageRoute from './routes/image.route.js'
import thumbnailRoute from './routes/thumbnail.route.js'
import authRoute from './routes/auth.route.js'
import dashboardRoute from './routes/dashboard.route.js'

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


connectToDb();

app.get('/health', (req, res) => {
  res.send('Server is Live');
});

app.use('/api/article', articleRoute);
app.use('/api/blog', blogRoute);
app.use('/api/image',  imageRoute);
app.use('/api/thumbnail', thumbnailRoute);
app.use('/api/auth/', authRoute);
app.use('/api/dashboard', dashboardRoute);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});