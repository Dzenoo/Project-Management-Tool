import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Project from "@/models/projects/project";

export const POST = async (request, { params }) => {
  try {
    const { status } = await request.json();

    console.log(status);
    if (!status) {
      return response("Invalid input: status is required", 400);
    }

    await connectToDB();

    const updatedProject = await Project.findOneAndUpdate(
      { _id: params.projectId },
      { status },
      { new: true }
    );

    if (!updatedProject) {
      return response("Project not found", 404);
    }

    return response("Status updated successfully", 200);
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};
