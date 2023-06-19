import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  first_name: { type: String, required: [true, "First Name is required"] },
  last_name: { type: String, required: [true, "Last Name is required"] },
  username: { type: String, required: [true, "Username is required"] },
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
  image: { type: String, required: [true, "Image is required"] },
  github: { type: String },
  linkedin: { type: String },
  website: { type: String },
  biography: { type: String },
  address: { type: String },
  specialize: { type: String },
  teams: [
    {
      team: { type: Schema.Types.ObjectId, ref: "Team" },
      role: { type: String },
    },
  ],
  notifications: [
    {
      image: { type: String },
      message: { type: String },
      date: { type: Date, default: Date.now() },
    },
  ],
});

const User = models.User || model("User", UserSchema);

export default User;
