"use client";
import { cn } from "@/lib/utils";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";

import { Edit, Hash, Mic, Trash, Video } from "lucide-react";
import { useParams,useRouter } from "next/navigation";
import { ActionTooltip } from "../ui/action-tooltip";
import { ModalType, useModal } from "@/hooks/use-modal-store";

interface ServerChannelProps {
    channel: Channel;
    server: Server;
    role?:MemberRole;


}

const iconMap = {
    [ChannelType.TEXT]: Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,

}

export const ServerChannel = ({
    channel,
    server,
    role,
}: ServerChannelProps) => {
    const params = useParams();
    const router = useRouter();
    const Icon = iconMap[channel.type];
    const {onOpen} = useModal();

    const onClick = () => {
        router.push(
            `/servers/${params?.serverId}/channels/${channel.id}`,
        );
    }
    const onAction = (e:React.MouseEvent, action:ModalType) => {
        e.stopPropagation();
        onOpen(action, {server, channel});
    }

return(

    <button
    onClick={onClick}
    className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
    )}>
        <Icon
            className="flex-shrink-0 2-5 h-5 text-zinc-500 dark:text-zinc-400">
        </Icon>
        <p>
            {channel.name}
        </p>
        {channel.name !== "general" && role!== MemberRole.GUEST && (
            <div className="ml-auto flex items-center gap-x-2">
                <ActionTooltip label="Edit Channel" side="top">
                <Edit
                onClick={(e) => onAction(e,"editChannel")}
                className="hidden group-hover:block w-4 h-4 text-zinc-500 dark:text-zinc-400 transition"
                />
                </ActionTooltip>
                <ActionTooltip label="Delete Channel" side="top">
                <Trash
                onClick={(e) => onAction(e,"deleteChannel")}
                className="hidden group-hover:block w-4 h-4 text-zinc-500 dark:text-zinc-400 transition"
                />
                </ActionTooltip>
            </div>


        )}

    </button>
)
}