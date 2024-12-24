import {queryClient} from "./utils/api/queryClient.ts";
import {QueryClientProvider} from "react-query";
import AuthPage from "./pages/AuthPage.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <ErrorBoundary>
                    <AuthPage/>
                </ErrorBoundary>
                {/*<ReactQueryDevtools/>*/}
            </QueryClientProvider>
        </>
    )
}

export default App
