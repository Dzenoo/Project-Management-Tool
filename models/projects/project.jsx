import { Schema, model, models } from "mongoose";
import Task from "../task/Task";
import Team from "../shared/Team";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    startDate: { type: Date, required: [true, "Start date is required"] },
    finishDate: { type: Date, required: [true, "Finish date is required"] },
    projectManager: {
      type: String,
      required: [true, "Project Manager is required"],
    },
    team: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      required: [true, "Team is required"],
    },
    budget: { type: Number, required: [true, "Budget is required"] },
    status: { type: String, required: [true, "Status is required"] },
    categories: [{ type: String, required: [true, "Category is required"] }],
    image: { type: String },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    files: [{ type: String }],
  },
  { timestamps: true },
);

const Project = models.Project || model("Project", ProjectSchema);

export default Project;
