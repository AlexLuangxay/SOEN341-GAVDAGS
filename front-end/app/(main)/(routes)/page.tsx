import {Button} from "@/components/ui/button";
import { DESTRUCTION } from "dns";
import { cn } from "@/lib/utils";
import {UserButton} from "@clerk/nextjs";
const state = true;
export default function Home() {
  return (
   <div  >
    <UserButton/>
    </div>
  );
}
