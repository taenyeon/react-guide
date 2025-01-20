import React, { useEffect } from 'react'
import useMonthlyCalendarViewModel from '@views/calendar/useMonthlyCalendarViewModel'
import './monthlyCalendarPage.scss'
import MonthlyCalendarBody from '@views/calendar/components/monthlyCalendarBody/MonthlyCalendarBody'
import MonthlyCalendarPopups from '@views/calendar/components/popup/MonthlyCalendarPopups'

const MonthlyCalendarPage: React.FC = () => {
  const {
    calculatedMonthlyCalendar: calendar,
    init,
    next,
    prev,
    openAddPopup,
  } = useMonthlyCalendarViewModel()

  useEffect(() => {
    init()
  }, [])

  if (!calendar) return <div></div>

  return (
    <>
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
        <div className="monthly-calendar__add">
          <button className="monthly-calendar__button" onClick={openAddPopup}>
            add Schedule
          </button>
        </div>
        <MonthlyCalendarBody calendar={calendar} />
        <MonthlyCalendarPopups />
      </div>
    </>
  )
}

export default MonthlyCalendarPage
