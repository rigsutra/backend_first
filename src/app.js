import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" })); // this is the limit the size of the json data fro the client side
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // this is the limit the size of the urlencoded data fro the client side
app.use(express.static("public"));
app.use(cookieParser());
export default app;
