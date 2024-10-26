import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './dbConfig/dbConfig.js';
import user from './models/usermodel.js';
import userrouter from './routes/user-routes.js'
import { config } from 'dotenv';

config();
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());

app.use("/",userrouter);


app.listen(8080, ()=>{
    console.log("server running on port    http://localhost:8080/");
    
})