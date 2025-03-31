import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/server/server-sidebar";


const ServerIdLayout = async (props: {
    children: React.ReactNode;
    params: { serverId: string };
  }) => {
    const { children, params } = props;
  
    const profile = await currentProfile();
    if (!profile) {
      return redirect("/");
    }
  
    const server = await db.server.findFirst({
      where: {
        id: params.serverId,
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
          <ServerSidebar serverId={params.serverId} />
        </div>
        <main className="h-full md:pl-60">{children}</main>
      </div>
    );
  };
  
  export default ServerIdLayout;
  