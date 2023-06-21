import Task from "@/components/tasks/TaskKanban";
import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Project from "@/models/projects/project";
import Team from "@/models/shared/Team";

// Get Projects
export const GET = async () => {
  try {
    await connectToDB();

    const projects = await Project.find()
      .populate({
        path: "tasks",
        populate: [{ path: "assignedTo", model: "User" }],
      })
      .populate({
        path: "team",
        populate: [{ path: "teamMembers", model: "User" }],
      });

    return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
    console.log(error);
    return response("Internal server error", 500);
  }
};
