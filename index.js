const express = require('express');
const mongoose = require('mongoose');
const sandboxRoutes = require('./routes/sandbox');
const cors=require("cors");
const authrouter = require('./routes/auth');
const app = express();
require("dotenv").config()
mongoose.connect(process.env.MONGODBCONNECT, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors())
app.use(express.json());
app.use('/sandbox', sandboxRoutes);
app.use('/auth',authrouter );

const PORT = process.env.PORT || 5000;
app.get("/",(req,res)=>{
   res.send("home page")
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
