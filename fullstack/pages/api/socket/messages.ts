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
        const { serverId, channelId } = req.query 

        if(!profile) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        if(!serverId ) {
            return res.status(400).json({
                error: "Servier Id is required",
            });
        }

        if(!channelId) {
            return res.status(400).json({
                error: "Channel Id is required",
            });
        }   

        if(!content) {
            return res.status(400).json({
                error: "Content or fileUrl is required",
            });
        }
        const server = await db.server.findFirst({
            where: {
              id: serverId as string,
              members: {
                some: {
                  ProfileId: profile.id
                }
              }
            },
            include: {
              members: true,
            }
          })
          
          if(!server) {
            return res.status(401).json({
                message: "Server not find",
            });
          }

          const channel = await db.channel.findFirst({
            where: {
              id: channelId as string,
              serverId: serverId as string,
            }
          });
          
          if(!channel) {
            return res.status(401).json({
                message: "Channel not find",
            });
          }

          const member = await server.members.find((member) => member.ProfileId === profile.id);

          if(!member) {
            return res.status(401).json({
                message: "Member not find",
            });
          }

          const message = await db.message.create({
            data: {
                content,
                fileUrl,
                channelId: channelId as string,
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

        const channelKey = `chat:${channelId}:messages`;

        res?.socket?.emit(channelKey,message);
       
        return res.status(200).json(message);
    }catch (error) {
        console.log("[MESSAGE_POST]",error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
    
}