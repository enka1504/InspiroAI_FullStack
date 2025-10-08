/*main entry point for the backend server*/
import express from 'express';
import 'dotenv/config';
import cors from 'cors';


import connectToDb from './config/db.js';
import clerkAuth from './middlewares/clerk.auth.js';
import testRoute from './routes/test.route.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
connectToDb();

app.get('/health', (req, res) => {
  res.send('Server is Live');
})

app.use('/api/test' , testRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

