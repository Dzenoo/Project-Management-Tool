import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Project from "@/models/projects/project";
import Task from "@/models/task/Task";
import User from "@/models/user/user";

export const POST = async (request) => {
  try {
    await connectToDB();

    const {
      title,
      description,
      finishDate,
      categories,
      tags,
      status,
      assignedTo,
      project,
    } = await request.json();

    const user = await User.findOne({ username: assignedTo });

    if (!user) {
      return response("Could not find user", 404);
    }

    const projectModel = await Project.findById(project);

    if (!projectModel) {
      return response("Could not find project", 404);
    }

    const createdTask = new Task({
      title,
      description,
      finishDate,
      categories,
      tags,
      status,
      assignedTo: user._id,
      project: project,
      messages: [],
    });

    projectModel.tasks.push(createdTask._id);

    await projectModel.save();
    await createdTask.save();

    return response("Task successfully created", 201);
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};
