import express from 'express';
import 'dotenv/config';
import cors from 'cors';
const app = express();
app.use(cors());
app.get("/",(req , res) =>
{
    res.send("Hello W");
})

app.listen(process.env.PORT);
