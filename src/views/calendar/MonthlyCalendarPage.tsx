import React, { useEffect } from 'react'
import useMonthlyCalendarViewModel from '@views/calendar/useMonthlyCalendarViewModel'
import './monthlyCalendarPage.scss'
import MonthlyCalendarBody from '@views/calendar/components/monthlyCalendarBody/MonthlyCalendarBody'

const MonthlyCalendarPage: React.FC = () => {
  const { calendar, init, next, prev } = useMonthlyCalendarViewModel()

  useEffect(() => {
    init()
  }, [])

  if (!calendar) return <div></div>

  return (
    <div className="monthly-calendar">
      <div className="monthly-calendar__controls">
        <button className="monthly-calendar__button" onClick={prev}>
          {'<'}
        </button>
        <div className="monthly-calendar__title">
          {calendar.year}년 {calendar.month}월
        </div>
        <button className="monthly-calendar__button" onClick={next}>
          {'>'}
        </button>
      </div>
      <MonthlyCalendarBody calendar={calendar} />
    </div>
  )
}

export default MonthlyCalendarPage
