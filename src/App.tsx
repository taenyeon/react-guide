import './App.css'
import {queryClient} from "./utils/api/queryClient.ts";
import {QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import AuthPage from "./pages/AuthPage.tsx";

function App() {
  return (
    <>
        <QueryClientProvider client={queryClient}>
        <AuthPage/>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    </>
  )
}

export default App
