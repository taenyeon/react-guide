import { queryClient } from '@utils/api/queryClient'
import { QueryClientProvider } from 'react-query'
import AuthPage from '@views/auth/AuthPage'
import SnackbarList from '@components/snackbar/SnackbarList'
import React from 'react'

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
