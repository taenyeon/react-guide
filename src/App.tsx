import AuthPage from '@views/auth/AuthPage'
import SnackbarList from '@components/snackbar/SnackbarList'
import React from 'react'
import Sidebar from '@views/layouts/sidebar/Sidebar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import MainPage from '@views/main/MainPage'
import CalendarPage from '@views/calendar/CalendarPage'

function App() {
  return (
    <>
      <Router>
        <div className={'main'}>
          <Sidebar />
          <div className={'content'}>
            <Routes>
              <Route path={'/'} element={<MainPage />} />
              <Route path={'/auth'} element={<AuthPage />} />
              <Route path={'/calendar'} element={<CalendarPage />} />
            </Routes>
          </div>
          <SnackbarList />
        </div>
      </Router>
    </>
  )
}

export default App
