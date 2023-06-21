import { connectToDB } from "@/lib/database";
import bcrypt from "bcrypt";
import User from "@/models/user/user";
import jwt from "jsonwebtoken";
import { response } from "@/lib/response";

export const POST = async (request) => {
  const { email, password } = await request.json();

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email: email });

    if (!existingUser) {
      return response("User cannot be found", 404);
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return response("Could not login, please check credentials", 500);
    }

    const token = jwt.sign({ userId: existingUser._id }, "strongsecret", {
      expiresIn: "2h",
    });

    return new Response(
      JSON.stringify({ token: token, userId: existingUser._id }),
      { status: 200 }
    );
    return response("Logged In", 200);
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};
