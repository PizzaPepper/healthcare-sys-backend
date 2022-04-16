import { connectDB } from "./db";
import app from "./app";
import { PORT } from "./config";

connectDB();

app.listen(PORT, () => {
  console.log("Server it's work on" , PORT);
});
