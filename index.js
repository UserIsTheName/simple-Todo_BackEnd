import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import TodoModel from "./todo.model.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
//seeAllTheTodos
const getAllTodos = async () => {
  try {
    const allTodos = await TodoModel.find({});
    return allTodos;
  } catch (error) {
    console.log({ errorFromGetAllTodos: error });
  }
};
//get all Todos
app.get("/", async (req, res) => {
  try {
    const data = await getAllTodos();
    if (!data) {
      res.status(404).json({ message: "no data uploaded yet!" });
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
  }
});

//totoPostHandler
const todoPostHandler = async (chunk) => {
  if (chunk.length > 0) {
    return await TodoModel.insertMany(chunk);
  } else {
    return await TodoModel.create(chunk);
  }
};
//postTodos
app.post("/Todo_upload", async (req, res) => {
  try {
    const chunks = await req.body;
    if (!chunks) {
      return res.status(400).json({ message: "please provide todos" });
    } else {
      await todoPostHandler(chunks);
      return res.status(201).json({ message: `todo Uploaded successfully` });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: `todo is already exist` });
    }
    console.log(error);
    return res.status(500).json({ message: "internal server error" });
  }
});
const PORT = process.env.PORT || 1102;
const connectHandler = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("connected to DB successfully");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
  app.listen(PORT, () => {
    console.log(`Server Started on port ${PORT}`);
  });
};
connectHandler();
