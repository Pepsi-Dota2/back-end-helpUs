import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router";
import env from "./env";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`${env.BASE_PATH}/v1`, router)

app.get('/', async (req: any, res: any) => {
    return res.json({
        status: "Welcome to my application",
    });
});

// set port, listen for requests
app.listen(10000, () => {
    console.log("Server is running on port 10000");
});


