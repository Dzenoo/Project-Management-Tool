import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Project from "@/models/projects/project";
import Task from "@/models/task/Task";

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    const task = await Task.findByIdAndRemove(params.taskId);
    const project = await Project.findById(task.project);
    await project.tasks.pull(task);
    await project.save();
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};
