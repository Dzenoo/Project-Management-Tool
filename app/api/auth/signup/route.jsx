import { connectToDB } from "@/lib/database";
import bcrypt from "bcrypt";
import User from "@/models/user/user";
import { response } from "@/lib/response";
import jwt from "jsonwebtoken";

export const POST = async (request) => {
  const { first_name, last_name, username, email, password } =
    await request.json();

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return response("User already exists with this email", 500);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

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
      specialize: "",
      favoritedProjects: [],
      archivedProjects: [],
      notifications: [],
      teams: [],
    });

    const user = await createdUser.save();

    const token = jwt.sign({ userId: user._id }, "strongsecret", {
      expiresIn: "2h",
    });

    const userInfo = {
      token: token,
      userId: user._id,
    };

    return new Response(JSON.stringify(userInfo), { status: 200 });
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};
