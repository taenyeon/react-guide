import React from 'react'
import useMonthlyCalendarHeaderViewModel from '@views/calendar/monthlyCalendar/components/monthlyCalendarHeader/useMonthlyCalendarHeaderViewModel'

const MonthlyCalendarHeader: React.FC = () => {
  const { currentDate, next, prev } = useMonthlyCalendarHeaderViewModel()
  return (
    <>
      <div className="monthly-calendar__controls">
        <button className="monthly-calendar__button" onClick={prev}>
          {'<'}
        </button>
        <div className="monthly-calendar__title">
          {currentDate.year}년 {currentDate.month}월
        </div>
        <button className="monthly-calendar__button" onClick={next}>
          {'>'}
        </button>
      </div>
    </>
  )
}
export default MonthlyCalendarHeader
