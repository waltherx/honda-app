"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { Slide, ToastContainer } from 'react-toastify';

export default function Providers({ children }: { children: React.ReactNode }) {
    const [client] = useState(new QueryClient());

    return (
        <QueryClientProvider client={client}>
            {children}
            <ToastContainer
                position="bottom-left"
                hideProgressBar={true}
                closeButton={false}
                draggable={false}
                transition={Slide}
            />
        </QueryClientProvider>
    );
}