import express from "express";
import dotenv from "dotenv"
 

dotenv.config();

const app = express();


app.use("/testing", (req, res) => {
    res.send("<h1>Server Instance is running<h1/> ")
})

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})