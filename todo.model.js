import mongoose from "mongoose";
const TodoSchema = new mongoose.Schema(
  {
    Title: { type: String, required: true, trim: true, unique: true },
    TargetDate: { type: Date, required: true },
    Priority: {
      default: "Low",
      enum: ["Low", "Medium", "High"],
      type: String,
      required: true,
    },
    Description: { type: String, required: true, trim: true },
    Status: {
      enum: ["incomplete", "complete"],
      required: true,
      default: "incomplete",
      type: String,
    },
  },
  { timestamps: true },
);
const TodoModel = mongoose.model("TodoModel", TodoSchema);
export default TodoModel;
