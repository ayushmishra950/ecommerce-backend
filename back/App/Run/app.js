const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

require('dotenv').config();
require('../Connection/connection');
require('../Routes/route')(app);


app.listen(5000,()=>{
    console.log('server is running on path "http://localhost:5000"');
})