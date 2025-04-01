import { Server, Member, Profile } from '@prisma/client';
import{ Server as NetServer, Socket } from 'net';
import { Server as SocketIoServer } from 'socket.io';
import { NextApiResponse } from 'next';
export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { Profile: Profile })[];
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: NetServer & {
    server: NetServer&{
      io: SocketIoServer;
    }
  };
};