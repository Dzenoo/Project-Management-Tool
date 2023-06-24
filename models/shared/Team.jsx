import { Schema, model, models } from "mongoose";
import Project from "../projects/project";

const TeamSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    description: { type: String, required: [true, "Description is required"] },
    image: { type: String },
    teamMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    projects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
  },
  { timestamps: true },
);

const Team = models.Team || model("Team", TeamSchema);

export default Team;
