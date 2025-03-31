import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    request: Request,
    { params }: { params: { serverId: string } }
) {
    try{
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if(!params.serverId){
            return new NextResponse("Server id is required", { status: 400 });
        }

        const serverId = await db.server.update(
            {
                where: { 
                    id: params.serverId,
                    profileId: {
                        not: profile.id,
                    },
                    members: {
                        some: {
                            ProfileId: profile.id,
                        },
                    }
                },

                data: {
                    members: {
                        deleteMany: {
                            ProfileId: profile.id,
                        },
                    },
                },
            }
        )
        return NextResponse.json(serverId);
    } catch(error) {
        console.log(error);
        return new NextResponse("Internal error", { status: 500 });
    }
}