import React from 'react'
import useWeeklyCalendarHeaderViewModel from '@views/calendar/weeklyCalendar/components/weeklyCalendarHeader/useWeeklyCalendarHeaderViewModel'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'

const WeeklyCalendarHeader: React.FC = () => {
  const { currentDate, next, prev } = useWeeklyCalendarHeaderViewModel()
  const { getDate } = dateFormatUtil
  const date = getDate({ year: currentDate.year, month: currentDate.month, day: currentDate.day })

  dayjs.extend(weekOfYear)

  return (
    <>
      <div className="weekly-calendar__controls">
        <button className="weekly-calendar__button" onClick={prev}>
          {'<'}
        </button>
        <div className="weekly-calendar__title">
          {date.year()}년 {date.week()}주차
        </div>
        <button className="weekly-calendar__button" onClick={next}>
          {'>'}
        </button>
      </div>
    </>
  )
}
export default WeeklyCalendarHeader
