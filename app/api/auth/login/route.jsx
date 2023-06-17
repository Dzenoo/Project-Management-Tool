import { connectToDB } from "@/lib/database";
import bcrypt from "bcrypt";
import User from "@/models/user/user";
import jwt from "jsonwebtoken";

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
    return new Response("Could not find user", { status: 404 });
  }

  if (!existingUser) {
    return new Response("User cannot be found", { status: 500 });
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, existingUser.password);
  } catch (error) {
    return new Response("Could not login, please check credentials", {
      status: 500,
    });
  }

  if (!isPasswordValid) {
    return new Response("Could not login, please check credentials", {
      status: 500,
    });
  }

  let token;
  try {
    token = jwt.sign({ userId: existingUser.id }, "strongsecret", {
      expiresIn: "2h",
    });
  } catch (error) {
    return new Response("Failed to login", { status: 500 });
  }

  const userInfo = {
    token: token,
  };

  return new Response(JSON.stringify(userInfo), { status: 200 });
};
