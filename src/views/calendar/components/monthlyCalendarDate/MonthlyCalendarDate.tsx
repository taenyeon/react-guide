import React from 'react'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'
import { DateOfCalendar } from '@typings/DateOfCalendar'
import dayjs from 'dayjs'
import MonthlyCalendarSchedule from '@views/calendar/components/monthlyCalendarSchedule/MonthlyCalendarSchedule'
import useCalendarStore from '@stores/useCalendarStore'

interface MonthlyCalendarDateProps {
  date: DateOfCalendar
  now: dayjs.Dayjs
  isOtherMonth: boolean
}

const MonthlyCalendarDate: React.FC<MonthlyCalendarDateProps> = ({ date, now, isOtherMonth }) => {
  const { selectDate } = useCalendarStore()
  let colorClass = ''
  if (date.isHoliday) colorClass = 'monthly-calendar__cell--holiday'
  if (date.isSaturday) colorClass = 'monthly-calendar__cell--saturday'
  if (isOtherMonth) colorClass = 'monthly-calendar__cell--other-month'

  return (
    <>
      <div className={`monthly-calendar__cell ${colorClass}`} onClick={() => selectDate(date)}>
        <div className="monthly-calendar__cell-date">
          {date.isToday(now) ? (
            <div className="monthly-calendar__reddot">{date.day}</div>
          ) : (
            <div>{date.day}</div>
          )}
        </div>
        <div className={'monthly-calendar__cell-schedules'}>
          {date.schedules.map((schedule: ScheduleOfDate | null, index) => {
            return <MonthlyCalendarSchedule key={index} schedule={schedule} />
          })}
        </div>
      </div>
    </>
  )
}

export default MonthlyCalendarDate
