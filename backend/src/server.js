/*main entry point for the backend server*/

import express from 'express';
import 'dotenv/config';


import connectToDb from './cofig/db.js';

const app = express();
const PORT = process.env.PORT || 5000;


connectToDb();

app.get('/health' , (req,res) => {
  res.send('Server is Live');
})

app.listen(PORT , () => {
  console.log(`Server is running on port ${PORT}`);
})

