import express from "express";
import {config} from "dotenv";
import morgan from "morgan";
import cors from "cors";
import Question from "./Routes/question.js"


config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use(cors({
credentials: true
}));


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"ok"
    })
});

app.use("/question",Question);

app.all('/{*any}',(req,res)=>{  
    res.status(400).send("Page not found!!..");
});

export default app;
