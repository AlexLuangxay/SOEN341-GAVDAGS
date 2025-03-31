import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/server-sidebar";

const ServerIdLayout = async (props: {
  children: React.ReactNode;
  params: Promise<{ serverId: string }>; 
}) => {
  const { children } = props;
  const { serverId } = await props.params; 

  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findFirst({
    where: {
      id: serverId,
      members: {
        some: {
          ProfileId: profile.id,
        },
      },
    },
  });

  if (!server) {
    return redirect("/");
  }

  return (
    <div className="h-full">
      <div className="hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
        <ServerSidebar serverId={serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
};

export default ServerIdLayout;
