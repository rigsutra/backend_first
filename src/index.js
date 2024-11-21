import dotenv from "dotenv";
import express from "express";
// import { DB_NAME } from "./constants";
import connectDB from "./db/db.js";

const app = express();

dotenv.config();

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.error("MONGODB connection Failed", error);
    throw error.message;
  });
// this is the code to connect to the database using a iffi function form the javascript

/*(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.error("Error connecting to the database");
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port  , ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("ERROR", error);
    throw error.message;
  }
})();
*/
