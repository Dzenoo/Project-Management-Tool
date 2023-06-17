const { default: mongoose, models, model } = require("mongoose");

const UserSchema = new mongoose.Schema({
  first_name: { type: String, required: [true, "First Name is required"] },
  last_name: { type: String, required: [true, "Last Name is required"] },
  username: { type: String, required: [true, "Username is required"] },
  email: { type: String, required: [true, "Email is required"] },
  password: { type: String, required: [true, "Password is required"] },
  image: { type: String, required: [true, "Image is required"] },
});

const User = models.User || model("User", UserSchema);

export default User;
