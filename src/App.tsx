import { queryClient } from './utils/api/queryClient.ts'
import { QueryClientProvider } from 'react-query'
import AuthPage from '@pages/auth/AuthPage.tsx'
import SnackbarList from './components/snackbar/SnackbarList.tsx'

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthPage />
        <SnackbarList />
        {/*<ReactQueryDevtools/>*/}
      </QueryClientProvider>
    </>
  )
}

export default App
