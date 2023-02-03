import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
  getNoteById,
} from "./controllers.js";

mongoose.set("strictQuery", false);
const app = express();
app.use(express.json());
app.use(cors());

app.get("/server/notes", getNotes);
app.get("/server/note/:id", getNoteById);
app.post("/server/create", createNote);
app.delete("/server/delete", deleteNote);
app.patch("/server/update", updateNote);

async function start() {
  try {
    mongoose.connect(
      process.env.MONGODB ||
        "mongodb+srv://admin:admin123@cluster0.k6ppzhv.mongodb.net/simple?retryWrites=true&w=majority"
    );
    app.listen(process.env.PORT || 5005, () => console.log(`Сервер работает!`));
  } catch (e) {
    console.log(e);
  }
}
start();
