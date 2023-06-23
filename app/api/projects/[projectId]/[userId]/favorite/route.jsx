import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Project from "@/models/projects/project";
import User from "@/models/user/user";

// Favorite Project
export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const project = await Project.findById(params.projectId);

    const projectInfo = {
      name: project.name,
      id: project._id,
    };

    const user = await User.findById(params.userId);

    const existingFavorite = user.favoritedProjects.find(
      (favProject) => favProject.id.toString() === params.projectId,
    );

    if (existingFavorite) {
      // Remove the favorite project
      user.favoritedProjects = user.favoritedProjects.filter(
        (favProject) => favProject.id.toString() !== params.projectId,
      );
    } else {
      // Add the favorite project
      user.favoritedProjects.push(projectInfo);
    }

    try {
      await user.save();

      if (existingFavorite) {
        return response("Project is unfavorited", 200);
      } else {
        return response("Project is favorited", 200);
      }
    } catch (error) {
      console.log(error);
      return response("Could not update favorite status", 500);
    }
  } catch (error) {
    return response("Internal server error", 500);
  }
};
