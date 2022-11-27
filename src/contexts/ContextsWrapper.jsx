import React from "react";
import {QueryClient, QueryClientProvider} from "react-query";
import ModalProvider from "./ModalContext";
import UserProvider from "./UserContext";
import {reactQueryConfig} from "../config/config";

const queryClient = new QueryClient(reactQueryConfig)

const ContextsWrapper = ({children}) => {
    return(
        <QueryClientProvider client={queryClient}>
        <UserProvider>
            <ModalProvider>{children}</ModalProvider>
        </UserProvider>
        </QueryClientProvider>
    )
}

export default ContextsWrapper;