import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String, required: [true, "Description is required"] },
  finishDate: { type: Date, required: [true, "Finish date is required"] },
  budget: { type: Number, required: [true, "Budget is required"] },
  status: { type: String, required: [true, "Status is required"] },
  categories: [{ type: String, required: [true, "Category is required"] }],
  tags: [{ type: String, required: [true, "Tags is required"] }],
  assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  messages: [{ type: Schema.Types.ObjectId, ref: "Message" }],
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;
