import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { ChannelType } from "@prisma/client";
import { ServerHeader } from "./server-header";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ServerSection } from "./server-section";
import { ServerChannel } from "./server-channel";
import { ServerMember } from "./server-member";
interface ServerSidebarProps {
    serverId: string;
}

export const ServerSidebar = async({serverId}:ServerSidebarProps) => {
    const profile = await currentProfile();
    if (!profile) {
        return redirect("/");
    }
    

    const server = await db.server.findUnique({
        where: {
            id: serverId,
        },
        include: {
            channels: {
                orderBy:{
                    createdAt: "asc",
                },
            },
            members: {
                include: {
                    Profile: true,
                },
                orderBy: {
                    role: "asc",
                },

             }
        },

    });

    const textChannels = server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
    const members = server?.members.filter((member) => member.ProfileId !== profile.id)

    if (!server) {
        return redirect("/");
    }

    const role = server.members.find((member) => member.ProfileId === profile.id)?.role;
    
    return(
        <div className="flex flex-col h-full text-primary w-full bg-[#F2F3F5] dark:bg-[#2B2D31]">
           <ServerHeader
           server = {server}
           role = {role}
           />

        <ScrollArea>
        <Separator className="bg-zinc-200 dark:bg-zinc-700 rounded-md my-2" />
            {!!textChannels?.length && (
                <div className="mb-2">
                    <ServerSection
                    sectionType="channels"
                    channelType= {ChannelType.TEXT}
                    role={role}
                    label="Text Channels"
                    />
                    {textChannels.map((channel) => (
                        <ServerChannel
                        key={channel.id}
                        channel={channel}
                        role={role}
                        server={server}
                        />
                    ))}
                </div>
            )}
                
            
            {!!members?.length && (
                <div className="mb-2">
                    <ServerSection
                    sectionType="members"
                    channelType= {ChannelType.TEXT}
                    role={role}
                    label="All members"
                    server={server}
                    />
                    {members.map((member) => (
                        <ServerMember
                        key={member.id}
                        member={member}
                        server={server}
                        />
                    ))}
                </div>
            )}
            
            


        </ScrollArea>
        </div>
    )
}