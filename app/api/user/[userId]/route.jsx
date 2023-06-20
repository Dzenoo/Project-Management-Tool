import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Project from "@/models/projects/project";
import Team from "@/models/shared/Team";
import User from "@/models/user/user";

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
          model: "Project",
        },
      ],
    });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};
