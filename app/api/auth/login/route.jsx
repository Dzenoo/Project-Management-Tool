import { connectToDB } from "@/lib/database";
import bcrypt from "bcrypt";
import User from "@/models/user/user";
import jwt from "jsonwebtoken";
import { response } from "@/lib/response";

export const POST = async (request) => {
  try {
    await connectToDB();
  } catch (error) {
    console.log(error);
  }
  const { email, password } = await request.json();

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    return response("Cannot find a user", 404);
  }

  if (!existingUser) {
    return response("User cannot be found", 404);
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return response("Could not login, please check credentials", 500);
  }

  if (!isPasswordValid) {
    return response("Could not login, please check credentials", 500);
  }

  let token;
  try {
    token = jwt.sign({ userId: existingUser.id }, "strongsecret", {
      expiresIn: "2h",
    });
  } catch (error) {
    return response("Failed to login, please try again", 500);
  }

  const userInfo = {
    token: token,
  };

  return new Response(JSON.stringify(userInfo), { status: 200 });
};
