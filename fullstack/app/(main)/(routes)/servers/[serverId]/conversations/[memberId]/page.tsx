import { ChatHeader } from "@/components/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

interface MemberIdPageProps {
    params: {
        serverId: string;
        memberId: string;
    };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
    const { serverId, memberId } = await params;

    const profile = await currentProfile();
    if (!profile) {
        return (
            redirect("/login")
        )
    }

    const currentMember = await db.member.findFirst({
        where:{
            ServerId: serverId,
            ProfileId: profile.id,
        },
        include:{
            Profile: true,
        }
    })

    
    if (!currentMember) {
        return (
            redirect("/")
        )
    }

  
    const conversation = await getOrCreateConversation(
        currentMember.id,
        memberId
    )
    
    if(conversation !== null) {
        console.log("Conversation found:", conversation);
    }
    else {
        console.log("No conversation found.");
    }
  

    if (!conversation) {
        return (
            redirect(`/servers/${serverId}`)
        )
    }
    const{memberOne, memberTwo} = conversation;
    
    const otherMember = memberOne.ProfileId === profile.id ? memberTwo : memberOne;  


        return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader
                name={otherMember.Profile.name}
                serverId={serverId}
                type="conversation"
                imageUrl={otherMember.Profile.imageUrl}/>
        </div>
     );
}
 
export default MemberIdPage;