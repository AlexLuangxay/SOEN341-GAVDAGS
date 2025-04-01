

import qs from "query-string"
import { useInfiniteQuery } from "@tanstack/react-query"

import { useSocket } from "@/components/providers/socket-provider"

interface ChatQueryProps {
    queryKey: string;
    apiUrl: string;
    paramKey: "channelId" | "conversationId";
    paramValue: string;
  }
  
  export const useChatQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
    }: ChatQueryProps) => {

        const { isConnected } = useSocket()
    

        const fetchMessages = async ({pageParam=undefined}) => {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query: {
                    [paramKey]: paramValue,
                    cursor: pageParam,
                },
            }, { skipNull: true })
            
            const response = await fetch(url);
            return response.json();
        }

        const{
            data,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            status,
        } = useInfiniteQuery({
            queryKey: [queryKey],
            queryFn: fetchMessages,
            getNextPageParam: (lastPage) => lastPage?.nextCursor,
            refetchInterval: isConnected ? 10000 : false,
            initialPageParam: undefined,
        });
          
        return {
            data,
            fetchNextPage,
            hasNextPage,
            isFetchingNextPage,
            status,
        };

    }