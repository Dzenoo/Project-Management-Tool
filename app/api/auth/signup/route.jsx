import { connectToDB } from "@/lib/database";
import bcrypt from "bcrypt";
import User from "@/models/user/user";
import { response } from "@/lib/response";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  try {
    await connectToDB();
  } catch (error) {
    console.log(error);
  }
  const { first_name, last_name, username, email, password } =
    await request.json();

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return response("Cannot find a user", 404);
  }

  if (existingUser) {
    return response("User already exists with this email", 500);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (error) {
    console.log(error);
  }

  const createdUser = new User({
    first_name,
    last_name,
    username,
    email,
    password: hashedPassword,
    image:
      "https://res.cloudinary.com/dzwb60tk1/image/upload/v1685889800/seifnijtssyuj3xrexkm.png",
    github: "",
    linkedin: "",
    website: "",
    biography: "",
    address: "",
    notifications: [],
  });

  let user;
  try {
    user = await createdUser.save();
  } catch (error) {
    return response("Failed to signup, please try again", 500);
  }

  let token;
  try {
    token = jwt.sign({ userId: user.id }, "strongsecret", { expiresIn: "2h" });
  } catch (error) {
    return response("Failed to signup, please try again", 500);
  }

  const userInfo = {
    token: token,
  };

  return new Response(JSON.stringify(userInfo), { status: 200 });
};
