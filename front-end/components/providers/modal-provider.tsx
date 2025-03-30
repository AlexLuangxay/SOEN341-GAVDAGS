"use client";

import { CreateServerModal } from "@/components/modals/create-server-modal";
import { useEffect, useState } from "react";
import { InviteModal } from "@/components/modals/invite-modal";
import { MemberModal } from "@/components/modals/members-modal";
import { EditServerModal } from "../modals/edit-server-modal";


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
            <InviteModal />
            <MemberModal />
            <EditServerModal/>
        </>
    )
}