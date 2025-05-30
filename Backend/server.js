require('dotenv').config();
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const PORT=3000||process.env.PORT;
const apiRouter=require('./routes/campaignroute');
const cors=require('cors');

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials:true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log('MongoDB connected');
})
.catch((err)=>{
    console.error('MongoDB connection error');
});

app.get('/',(req,res)=>{
    return res.send('Hello World');
});
app.use('/api',apiRouter);

app.listen(PORT,()=>{
    console.log("Hello From Backend !"); // 3000 default
})