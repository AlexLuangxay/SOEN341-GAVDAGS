import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export async function DELETE(req: Request, props: { params: Promise<{ channelId: string }> }) {
  const params = await props.params;
  try {
    const profile = await currentProfile();
    const {searchParams} = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if(!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if(!params.channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    console.log("Deleting channel with ID", params.channelId, "from server", serverId);
    const server = await db.server.update({
        where: {
          id: serverId,
          members: {
            some: {
              ProfileId: profile.id,
              role: {
                in: [MemberRole.ADMIN, MemberRole.MODERATOR],
              },
            },
          },
        },
        data: {
          channels: {
            delete: {
                id: params.channelId,
                name: {
                  not: "general",
                     },
               }
            }
        },
      });
      console.log("Server after channel delete", server);
      return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("[CHANNEL_ID_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}


export async function PATCH(req: Request, props: { params: Promise<{ channelId: string }> }) {
  const params = await props.params;
  try {
    const profile = await currentProfile();
    const { name, type } = await req.json();
    const {searchParams} = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if(!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if(!serverId) {
      return new NextResponse("Server ID missing", { status: 400 });
    }

    if(!params.channelId) {
      return new NextResponse("Channel ID missing", { status: 400 });
    }

    if (name === "general"){
      return new NextResponse("Cannot rename general channel", { status: 400 });
    }

    console.log("Deleting channel with ID", params.channelId, "from server", serverId);
    const server = await db.server.update({
        where: {
          id: serverId,
          members: {
            some: {
              ProfileId: profile.id,
              role: {
                in: [MemberRole.ADMIN, MemberRole.MODERATOR],
              },
            },
          },
        },
        data: {
          channels: {
            update: {
              where: {
                id: params.channelId,
                NOT: {
                  name: "general",
                },
              },
              data: {
                name,
                type,
              }
            }
          }
        }
      });
      console.log("Server after channel delete", server);
      return NextResponse.json(server, { status: 200 });
  } catch (error) {
    console.log("[CHANNEL_ID_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}