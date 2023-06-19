import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Project from "@/models/projects/project";
import Team from "@/models/shared/Team";

// Get Projects
export const GET = async (request) => {
  const {} = await request.json();

  try {
    await connectToDB();

    const teamObj = await Team.findOne({ name: team });
  } catch (error) {
    return response("Internal server error", 500);
  }
};
