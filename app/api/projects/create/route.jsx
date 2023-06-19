import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Project from "@/models/projects/project";
import Team from "@/models/shared/Team";

// Create Project
export const POST = async (request) => {
  const {
    name,
    description,
    startDate,
    finishDate,
    projectManager,
    team,
    budget,
    status,
    categories,
  } = await request.json();

  try {
    await connectToDB();

    const teamObj = await Team.findOne({ name: team });

    const createdProject = new Project({
      name,
      description,
      startDate,
      finishDate,
      projectManager,
      team: teamObj._id,
      budget,
      status,
      categories,
      image:
        "https://res.cloudinary.com/dzwb60tk1/image/upload/v1687107869/Untitled_fpd6tc.png",
    });

    try {
      await createdProject.save();
      teamObj.projects.push(createdProject._id);
      await teamObj.save();
      return response("Project Created Successfully", 201);
    } catch (error) {
      console.log(error);
      return response("Could not create project right now", 500);
    }
  } catch (error) {
    return response("Internal server error", 500);
  }
};
