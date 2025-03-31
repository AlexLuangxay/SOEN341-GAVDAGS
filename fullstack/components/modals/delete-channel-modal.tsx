"use client";
import qs from "query-string";
import { useModal } from "@/hooks/use-modal-store";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";

import { Button } from "@/components//ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export const DeleteChannelModal = () => {
    const {isOpen, onClose, type, data} = useModal();
    const router = useRouter();
    const isModalOpen = isOpen && type === "deleteChannel";
    const {server, channel} = data;
    const [isLoading, setIsLoading] = useState(false);
    const [localServer, setLocalServer] = useState(server);

    const onClick = async() => {
      try{
        setIsLoading(true)
 
    
        
        const url = qs.stringifyUrl({
          url: `/api/channels/${channel?.id}`,
          query: {
            serverId: server?.id,
          },
        });
        
        console.log("Deleting channel with ID", channel?.id, "from server", server?.id);
        await axios.delete(url);
        console.log("I SHOULD BE HERE");
        onClose();
        router.refresh();
        router.push(`/servers/${server?.id}`);
      }
      catch(error){
        console.log("THIS IS AN EROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR")
        console.log(error)
      }
      finally{

        setIsLoading(false)
        router.refresh();
        router.push(`/servers/${server?.id}`);
        onClose()
      }
    }

    useEffect(() => {
  if (server) setLocalServer(server);
}, [server]);

    


return(
  <Dialog open={isModalOpen} onOpenChange={onClose}> 
    <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">Delete channel</DialogTitle>
            <DialogDescription className="text-center text-sm text-neutral-500 mt-2 mb-4">
              Are you sure you want to delete the server <br/><span className=" text-blue-500 font-bold">#{channel?.name}</span> will be deleted. <br/> This action cannot be undone.
            </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full"> 
          <Button
          disabled={isLoading}
          onClick={onClose}
          variant="ghost">
            No
          </Button>
          <Button
           disabled={isLoading}
           onClick={onClick}
           variant="primary">
            Yes
          </Button>
          </div>
          </DialogFooter>
    </DialogContent>
  </Dialog>)}    
