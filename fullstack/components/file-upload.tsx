"use client"
import { UploadDropzone } from "@/lib/uploadthing";
import {X} from "lucide-react";
import Image from "next/image";
//import "@uploadthing/react/styles.css";

interface FileUploadProps {
    onChange: (url? : string) => void;
    value: string;
    endpoint: "messageFile" | "serverImage" 
}



export const FileUpload = ({
    onChange,
    value,
    endpoint,
}: FileUploadProps) => {
    const fileTytpe = value?.split(".").pop();
    if(value && fileTytpe !== "pdf"){
        return (
            <div className = "relative h-20 w-20">
                <Image
                fill
                src={value}
                alt="Uploaded file"
                className="rounded-full"/>
                <button onClick = {() => onChange("")} className = "bg-rose-500 text-white p-1 rounded=full absolute top-0 right-0 shadowm-sm"
                    type="button">
                    <X className = "h-4 w-4"/>
                    
                </button>
            </div>
        )
    }



    return (
       <UploadDropzone
       endpoint={endpoint}
       onClientUploadComplete={(res) => {
        onChange(res?.[0]?.ufsUrl ); // Assuming 'url' is the correct property name

       }}
         onUploadError={(error: Error) => {
          console.log(error);
     }}/>
    )
}

