// import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const client = new QueryClient();

// O StrictMode nao funcionou corretamente com o QueryClientProvider, por isso foi comentado. 😢

ReactDOM.createRoot(document.getElementById("root")!).render(
    // <StrictMode>
        <QueryClientProvider client={client}>
            <App />
        </QueryClientProvider>
    // </StrictMode>
);
