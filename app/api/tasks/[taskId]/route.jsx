import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Project from "@/models/projects/project";
import Task from "@/models/task/Task";
import User from "@/models/user/user";

export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();

    const { title, description, date } = await request.json();

    const task = await Task.findById(params.taskId);

    if (!title && !description && !date) {
      return response("Invalid inputs passed, please check data", 500);
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.finishDate = date || task.finishDate;

    await task.save();

    return response("Task edited successfully!", 200);
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};

export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const { message, userId } = await request.json();

    const task = await Task.findById(params.taskId);
    const user = await User.findById(userId);

    const createdMessage = {
      message,
      username: user.username,
      image: user.image,
    };

    task.messages.push(createdMessage);

    await task.save();

    return response("Commented successfully!", 200);
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};

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
