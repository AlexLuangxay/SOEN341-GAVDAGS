import { ChatHeader } from "@/components/chat-header";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface ChannelIdPageProps{
    params:{
        serverId: string;
        channelId: string;
    }
}

const ChannelIdPage = async ({ params }: { params: Promise<{ serverId: string; channelId: string }> }) => {
    const { serverId, channelId } = await params;
    const profile = await currentProfile();

    if(!profile) {
        return (
           redirect("/login")
        )
    }

    const channel = await db.channel.findUnique({
        where:{
            id: channelId,
        }
    })
    
    const member = await db.member.findFirst({
        where:{
            ServerId: serverId,
            ProfileId: profile.id,
        }
    });

    if(!channel || !member) {
        return (
            redirect("/")
        )
    }

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
            name = {channel.name}
            serverId={channel.serverId}
            type="channel"/>
        </div>
    )
}
export default ChannelIdPage;