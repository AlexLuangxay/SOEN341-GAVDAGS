import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";


interface ServerIdPageProps {
    params: {
        serverId: string;
    
    };
}

const ServerIdPage = async (props: { params: Promise<{ serverId: string }> }) => {
  const { serverId } = await props.params;

  
    const profile = await currentProfile();
    if (!profile) return redirect("/sign-in");
  
    const server = await db.server.findUnique({
      where: {
        id: serverId,
      },
      include: {
        members: true,
        channels: {
          where: { name: "general" },
          orderBy: { createdAt: "asc" },
        },
      },
    });
  
    const initialChannel = server?.channels[0];
    if (initialChannel?.name !== "general") {
      console.log("No general channel found.");
      return null;
    }
  
    return redirect(`/servers/${serverId}/channels/${initialChannel.id}`);
  };
  
  export default ServerIdPage;
  