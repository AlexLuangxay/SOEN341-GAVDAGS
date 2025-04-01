import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { Message } from "@prisma/client";
import { NextResponse } from "next/server";

const MESSAGE_BATCH = 100

export async function GET(request: Request) {
    try{
        const profile = await currentProfile();
        const { searchParams } = new URL(request.url);

        const cursor = searchParams.get("cursor");
        const channelId = searchParams.get("channelId");

        if (!profile) {
            return new Response("Unauthorized", { status: 401 });
        }
        if (!channelId) {
            return new Response("Missing channelId", { status: 400 });
        }

        let messages: Message[] = [];

        if(cursor) {
            messages = await db.message.findMany({
                take: MESSAGE_BATCH,
                skip: 1,
                cursor: {
                    id: cursor,
                },
                where: {
                    channelId: channelId,
                },
                
                include:{
                    member: {
                        include: {
                            Profile: true,
                        },
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            
            })
        } else {
            messages = await db.message.findMany({
                take: MESSAGE_BATCH,
                where: {
                    channelId: channelId,
                },
                include:{
                    member: {
                        include: {
                            Profile: true,
                        },
                    }
                },
                orderBy: {
                    createdAt: "desc",
                }
            })
            

        }

        let nextCursor = null;

        if(messages.length === MESSAGE_BATCH) {
            nextCursor = messages[MESSAGE_BATCH - 1].id;
        }

        return NextResponse.json({
            items: messages,
            nextCursor: nextCursor,
        });

    }catch(e) {
        console.error("MESSAGE_GET",e);
        return new Response("Internal Server Error", { status: 500 });
    }

}