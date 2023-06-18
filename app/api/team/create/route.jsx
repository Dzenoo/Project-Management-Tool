import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Team from "@/models/shared/Team";

export const POST = async (request) => {
  try {
    await connectToDB();
  } catch (error) {
    console.log(error);
  }

  const { name, description } = await request.json();

  const createdTeam = new Team({
    name,
    description,
    image:
      "https://res.cloudinary.com/dzwb60tk1/image/upload/v1687107869/Untitled_fpd6tc.png",
    teamMembers: [],
    projects: [],
  });

  try {
    await createdTeam.save();
    return response("Team created successfully!", 201);
  } catch (error) {
    return response("Could not create team right now, please try later", 500);
  }
};
