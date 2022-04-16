import express, { Application,json } from "express";
import routerUser from "./routes/users.routes";
import routerExp from "./routes/expedients.routes";
import morgan from "morgan";
import cors from "cors";

const app: Application = express();


//Middleware
app.use(morgan('dev'));
app.use(json());
app.use(cors());


//Routes
app.use("/api/v1/users",routerUser);
app.use("/api/v1/exp",routerExp);


export default app;
