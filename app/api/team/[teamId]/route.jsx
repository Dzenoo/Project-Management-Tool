import { connectToDB } from "@/lib/database";
import { response } from "@/lib/response";
import Team from "@/models/shared/Team";
import User from "@/models/user/user";

// Invite to team route
export const POST = async (request, { params }) => {
  const { usernameOfInvitedUser, sendingUserId } = await request.json();

  try {
    await connectToDB();

    const invitedUser = await User.findOne({ username: usernameOfInvitedUser });

    if (!invitedUser) {
      return response("Could not find user", 404);
    }

    const sendingUser = await User.findById(sendingUserId);

    if (!sendingUser) {
      return response("Could not find user", 404);
    }

    const team = await Team.findById(params.teamId);

    if (!team) {
      return response("Could not find team", 404);
    }

    const notification = {
      image: sendingUser.image,
      message: `${sendingUser.first_name} ${sendingUser.last_name} added you to team ${team.name}`,
    };

    try {
      team.teamMembers.push({ user: invitedUser._id, role: "member" });
      invitedUser.teams.push({ team: team._id, role: "member" });
      invitedUser.notifications.push(notification);
      await team.save();
      await invitedUser.save();
      return response("User added to the team successfully", 200);
    } catch (error) {
      return response("Could not add user to team, please try again", 500);
    }
  } catch (error) {
    console.log(error);
    return response("Internal Server Error", 500);
  }
};
