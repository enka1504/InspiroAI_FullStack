/*main entry point for the backend server*/
import express from 'express';
import 'dotenv/config';
import cors from 'cors';


import connectToDb from './cofig/db.js';
import clerkAuth from './middlewares/clerk.auth.js';


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin:`${process.env.FRONTEND_URL}`,
  credentials:true,
}))

connectToDb();

app.get('/health', (req, res) => {
  res.send('Server is Live');
})

/*checking auth for protected routes*/
/*public routes do not need this middleware*/

app.use('/api/public', (req, res) => {
  res.send('You have accessed a public route');
});

app.use('/api/protected', clerkAuth, (req, res) => {
  res.json({
    message: 'You have accessed a protected route',
    authID: req.auth.userId,
    authSessionId: req.auth.sessionId,
  })
})





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})

