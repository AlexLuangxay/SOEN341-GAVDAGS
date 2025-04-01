import { db } from "@/lib/db";


export const getOrCreateConversation = async (memberOneId:string, memberTwoId:string) => {
    let conversation = await findConversation(memberOneId, memberTwoId)|| await findConversation(memberTwoId, memberOneId);
    if(!conversation){
        console.log("No conversation found, creating a new one.");
        conversation = await createNewConversation(memberOneId, memberTwoId);
        console.log("New conversation created:", conversation);
    }
    return conversation;

}
const findConversation = async (memberOneId:string, memberTwoId:string) => {

    try{

    return await db.conversation.findFirst({
        where:{
            AND:[
                {memberOneId: memberOneId},
                {memberTwoId: memberTwoId}
            ]
        },
        include:{
            memberOne:{
                include:{
                    Profile: true,
                }
            },
            memberTwo:{
                include:{
                    Profile: true,
                }
            },
        }
    })
}
    catch{
        return null;
    }
}

const createNewConversation = async (memberOneId:string, memberTwoId:string) => {
    try{
        return await db.conversation.create({
            data:{
                memberOneId: memberOneId,
                memberTwoId: memberTwoId,
            },
            include:{
                memberOne:{
                    include:{
                        Profile: true,
                    }
                },
                memberTwo:{
                    include:{
                        Profile: true,
                    }
                },
            }
        })
    }
    catch(error){
        console.log("Error creating new conversation:", error);
        return null;
    }
}