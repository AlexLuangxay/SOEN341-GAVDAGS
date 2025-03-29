"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {

    const[isMOunted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }
    ,[]);
    if(!isMOunted){
        return null;
    }
    return(
        <>
            <CreateServerModal />
        </>
    )
}