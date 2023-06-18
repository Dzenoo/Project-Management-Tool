import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Team from "@/models/shared/Team";
import User from "@/models/user/user";

export const POST = async (request) => {
  try {
    await connectToDB();
  } catch (error) {
    console.log(error);
  }

  const { name, description, userId } = await request.json();

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      return response("Could not find user", 404);
    }
  } catch (error) {
    return response("Could not find user", 404);
  }

  const createdTeam = new Team({
    name,
    description,
    image:
      "https://res.cloudinary.com/dzwb60tk1/image/upload/v1687107869/Untitled_fpd6tc.png",
    teamMembers: [],
    projects: [],
  });

  try {
    createdTeam.teamMembers.push({ user: user._id, role: "admin" });
    user.teams.push({ team: createdTeam._id, role: "admin" });
    await user.save();
    await createdTeam.save();
    return response("Team created successfully!", 201);
  } catch (error) {
    return response("Could not create team right now, please try later", 500);
  }
};
