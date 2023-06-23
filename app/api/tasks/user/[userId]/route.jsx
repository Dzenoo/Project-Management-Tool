import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Task from "@/models/task/Task";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const tasks = await Task.find({ assignedTo: params.userId }).populate([
      "assignedTo",
      "project",
    ]);

    return new Response(JSON.stringify(tasks), { status: 200 });
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};
