import express from "express";
import cors from "cors";
import "dotenv/config";
import { apiKeyMiddleware } from "./middlewares/apiKeyMiddleware";
import imageRouter from "./routers/image.routes";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(apiKeyMiddleware);
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.use("/images", imageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
