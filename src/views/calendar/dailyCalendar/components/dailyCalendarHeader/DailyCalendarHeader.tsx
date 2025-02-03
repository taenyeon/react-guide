import React from 'react'
import useDailyCalendarHeaderViewModel from '@views/calendar/dailyCalendar/components/dailyCalendarHeader/useDailyCalendarHeaderViewModel'

const DailyCalendarHeader: React.FC = () => {
  const { currentDate, next, prev } = useDailyCalendarHeaderViewModel()
  return (
    <>
      <div className="monthly-calendar__controls">
        <button className="monthly-calendar__button" onClick={prev}>
          {'<'}
        </button>
        <div className="monthly-calendar__title">
          {currentDate.year}년 {currentDate.month}월 {currentDate.day}일
        </div>
        <button className="monthly-calendar__button" onClick={next}>
          {'>'}
        </button>
      </div>
    </>
  )
}
export default DailyCalendarHeader
