import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import User from "@/models/user/user";

export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const {
      firstname,
      lastname,
      email,
      specialize,
      biography,
      address,
      github,
      linkedin,
      website,
    } = await request.json();

    const user = await User.findById(params.userId);

    user.first_name = firstname || user.first_name;
    user.last_name = lastname || user.last_name;
    user.email = email || user.email;
    user.specialize = specialize || user.specialize;
    user.biography = biography || user.biography;
    user.address = address || user.address;
    user.github = github || user.github;
    user.linkedin = linkedin || user.linkedin;
    user.website = website || user.website;

    await user.save();

    return response("User info updated successfully", 200);
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const user = await User.findById(params.userId).populate({
      path: "teams",
      populate: [
        {
          path: "teamMembers",
          model: "User",
        },
        {
          path: "projects",
        },
      ],
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return response(error, 500);
  }
};
