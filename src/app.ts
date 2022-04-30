import express, { Application, json } from "express";
import fileUpload from "express-fileupload";
import routerUser from "./routes/users.routes";
import routerExp from "./routes/expedients.routes";
import path from "path"

import morgan from "morgan";
import cors from "cors";

const app: Application = express();


//Middleware
app.use(morgan("dev"));
app.use(json());
app.use(cors({
  exposedHeaders: ['X-Token']
}));


app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(express.static('public'));

//Routes
app.use("/api/v1/users", routerUser);
app.use("/api/v1/exp", routerExp);

export default app;
