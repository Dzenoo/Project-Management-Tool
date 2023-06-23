import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Task from "@/models/task/Task";

export const POST = async (request, { params }) => {
  try {
    await connectToDB();

    const { status, taskId } = await request.json();

    const task = await Task.findOneAndUpdate(
      { _id: taskId },
      { status },
      { new: true },
    );

    if (!task) {
      return response("Task not found", 404);
    }

    return response("Task Status updated successfully", 200);
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};
