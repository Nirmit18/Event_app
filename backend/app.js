const express= require('express');
const app = express();
const cors=require('cors')
const cookieParser=require("cookie-parser");
const mydb = require("../backend/db")
mydb();
// const User =require("./Schema/user_schema")

const authroutes=require("./routes/authroutes");

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}))

app.use(cookieParser());
app.use(express.json());
app.use("/api",authroutes)



app.listen(8000,()=>{
    console.log("server is working on port 8000"); 
})


