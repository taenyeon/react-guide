import React from 'react'
import { Calendar } from '@typings/Calendar'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'

interface DailyCalendarBodyProps {
  calendar?: Calendar
}

const DailyCalendarBody: React.FC<DailyCalendarBodyProps> = ({ calendar }) => {
  const { getTime } = dateFormatUtil
  const hours = Array.from({ length: 24 }, (_, index) => index)
  const schedules: Array<ScheduleOfDate | null> = calendar.dates[0].schedules
  return (
    <>
      <div className="daily-calendar__body">
        <div className="daily-calendar__cell">
          <p>AllDay</p>
          {schedules != null &&
            schedules
              .filter(schedule => schedule.isAllDay)
              .map(schedule => <div className="daily-calendar__schedule">{schedule.title}</div>)}
        </div>
        {hours.map((hour, index) => (
          <div className="daily-calendar__cell" key={index}>
            <p>{getTime(hour, 0)}</p>
            {schedules != null &&
              schedules
                .filter(
                  schedule =>
                    !schedule.isAllDay && schedule.startHour <= hour && schedule.endHour >= hour,
                )
                .map(schedule => <div className="daily-calendar__schedule">{schedule.title}</div>)}
          </div>
        ))}
      </div>
    </>
  )
}

export default DailyCalendarBody
