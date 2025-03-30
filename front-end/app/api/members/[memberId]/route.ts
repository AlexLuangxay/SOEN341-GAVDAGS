import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    request: Request,
    { params }: { params: { memberId: string } }
){
    try{
        const profile = await currentProfile();
        const {searchParams} = new URL(request.url);
        const serverId = searchParams.get("serverId");
 

        if(!profile){
            return new Response("Unauthorized", {status: 401});
        }    

        if(!serverId){
            return new Response("Server ID is required", {status: 400});
        }

        if(!params.memberId){
            return new Response("Member ID is required", {status: 400});
        }
    

        const server = await db.server.update({
            where: {
                id: serverId,
                profileId: profile.id,
            },
            data: {
                members: {
                    deleteMany: {
                            id: params.memberId,
                            ProfileId:{
                                not: profile.id,
                            },
                      }
                    }
            },
            include: {
                members: {
                    include: {
                        Profile: true,
                    },
                    orderBy: {
                       role: "asc",
                    }
                }
            }
        });

        return NextResponse.json(server);
    }
    
    catch (error) {
        console.log("MEMBER_ID_DELETE]",error);
        return new Response("Internal Error", {status: 500});
    }
}


export async function PATCH(
    request: Request,
    { params }: { params: { memberId: string } }
){

    try{
        const profile = await currentProfile();
        const {searchParams} = new URL(request.url);
        const{ role } = await request.json();
        const serverId = searchParams.get("serverId");

        if(!profile){
            return new Response("Unauthorized", {status: 401});
        }

        if(!serverId){
            return new Response("Server ID is required", {status: 400});
        }
        if(!params.memberId){
            return new Response("Member ID is required", {status: 400});
        }

        const server = await db.server.update({
            where: {
                id: serverId,
            },
            data: {
                members: {
                    update: {
                        where: {
                            id: params.memberId,
                            ProfileId:{
                                not: profile.id,
                            }
                        },
                    
                        data: {
                            role,
                        }
                    }
                }
            },


            include: {
                members: {
                    include: {
                        Profile: true,
                    },
                    orderBy: {
                       role: "asc",
                    }
                }
            }
        });

        return NextResponse.json(server)
    } catch (error: unknown) {
        return new Response("Internal Error", {status: 500});
}
    }
