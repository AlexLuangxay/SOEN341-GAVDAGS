import { currentProfile } from "@/lib/current-profile";
import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
){
    
    
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"});
    }
    try {
        const profile = await currentProfilePages(req);

        const { content, fileUrl} = req.body;
        const { conversationId } = req.query 

        if(!profile) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        if(!conversationId ) {
            return res.status(400).json({
                error: "conversationId Id is required",
            });
        }

   
    

        if(!content) {
            return res.status(400).json({
                error: "Content or fileUrl is required",
            });
        }


          const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                OR: [
                    {
                        memberOne:{
                            ProfileId: profile.id
                        }
                    },
                    {
                        memberTwo:{
                            ProfileId: profile.id
                        }
                    }
                ]
            },
            include: {
                memberOne: {
                    include: {
                        Profile: true,
                    }
                },
                memberTwo: {
                    include: {
                        Profile: true,
                    }
                }
            }
          })
         
          if(!conversation) {
            return res.status(401).json({
                message: "Conversation not find",
            });
          }

          const member = conversation.memberOne.ProfileId === profile.id ? conversation.memberOne : conversation.memberTwo;

          if(!member) {
            return res.status(401).json({
                message: "Member not find",
            });
          }

          const message = await db.directMessages.create({
            data: {
                content,
                fileUrl,
                conversationId: conversationId as string,
                memberId: member.id,
            },
            include: {
                member: {
                    include: {
                        Profile: true,
                    }
                }
            }
        })

        const channelKey = `chat:${conversationId}:messages`;

        res?.socket?.emit(channelKey,message);
       
        return res.status(200).json(message);
    }catch (error) {
        console.log("[DIRECTMESSAGE_POST]",error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
    
}