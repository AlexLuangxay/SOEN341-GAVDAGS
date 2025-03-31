import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const { inviteCode } = params;
  if (!inviteCode) {
    return redirect("/");
  }

  // Check if user is already in the server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          ProfileId: profile.id, 
        },
      },
    },
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  // Join the server as a member
  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: {
          ProfileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/"); 
  }

  return redirect(`/servers/${server.id}`);
};

export default InviteCodePage;
