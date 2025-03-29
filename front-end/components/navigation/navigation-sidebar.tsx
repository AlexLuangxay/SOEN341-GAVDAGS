import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { currentProfile } from "@/lib/current-profile";
import { NavigationAction } from "./navigation-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { NavigationItem } from "./navigation-items";
import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";


export const NavigationSidebar = async () => {
    const profile =  await currentProfile();
    if(!profile){
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    ProfileId: profile.id,
                }
            }
        }
    });


    return(
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full bg-[#1E1F22] py-3 ">
        <NavigationAction />
        <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-mb w-10 mx-auto"/>
        <ScrollArea className="flex-1 w-full">
            {servers.map((server) => (
                <div key={server.id} className="mb-4">
                    <NavigationItem 
                    id={server.id}
                    imageUrl={server.imageUrl}
                    name = {server.name}/>
                </div>
            ))}
        </ScrollArea>
        <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
               <UserButton 
                afterSignOutUrl="/"
                appearance={{
                    elements: {
                        avatar: "h-48 w-48",
                    }
                }}
               
               />
               <ModeToggle />
         
        </div>
    </div>
    )}