import { Schema, model, models } from "mongoose";
import User from "../user/user";
import Project from "../projects/project";

const TaskSchema = new Schema(
  {
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },
    finishDate: { type: Date, required: [true, "Finish date is required"] },
    categories: [{ type: String, required: [true, "Category is required"] }],
    tags: [{ type: String, required: [true, "Tags is required"] }],
    status: { type: String, required: [true, "Status is required"] },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    messages: [
      {
        message: { type: String, required: [true, "Message is required"] },
        username: { type: String, required: [true, "Username is required"] },
        image: { type: String, required: [true, "Image is required"] },
      },
    ],
  },
  { timestamps: true },
);

const Task = models.Task || model("Task", TaskSchema);

export default Task;
