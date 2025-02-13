import React from 'react'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'
import { DateOfCalendar } from '@typings/DateOfCalendar'
import dayjs from 'dayjs'
import useMonthlyCalendarDateViewModel from '@views/calendar/monthlyCalendar/components/monthlyCalendarDate/useMonthlyCalendarDateViewModel'
import MonthlyCalendarSchedule from '@views/calendar/monthlyCalendar/components/monthlyCalendarSchedule/MonthlyCalendarSchedule'

interface MonthlyCalendarDateProps {
  index: number
  date: DateOfCalendar
  now: dayjs.Dayjs
  isOtherMonth: boolean
}

const MonthlyCalendarDate: React.FC<MonthlyCalendarDateProps> = ({
  index,
  date,
  now,
  isOtherMonth,
}) => {
  const { selectDay } = useMonthlyCalendarDateViewModel()
  let colorClass = ''
  if (date.isSunday) colorClass = 'monthly-calendar__cell--holiday'
  if (date.isSaturday) colorClass = 'monthly-calendar__cell--saturday'
  if (isOtherMonth) colorClass = 'monthly-calendar__cell--other-month'

  const schedules = date.schedules.filter(schedule => schedule != null)

  const hasMoreSchedules = schedules.length > 3

  const maxSchedules = date.schedules.slice(0, 3)

  return (
    <>
      <div className={`monthly-calendar__cell ${colorClass}`} onClick={() => selectDay(date)}>
        <div className="monthly-calendar__cell-date">
          {date.holiday && <span className="monthly-calendar__cell-text">{date.holiday}</span>}
          <div className="monthly-calendar__cell-day">
            {date.isToday(now) ? (
              <div className="monthly-calendar__reddot">{date.day}</div>
            ) : (
              <div>{date.day}</div>
            )}
          </div>
        </div>
        <div className={'monthly-calendar__cell-schedules'}>
          {maxSchedules.map((schedule: ScheduleOfDate | null, index) => {
            return <MonthlyCalendarSchedule key={index} schedule={schedule} />
          })}
          {hasMoreSchedules && <div className="monthly-calendar__more-dots">•••</div>}
        </div>
      </div>
    </>
  )
}

export default MonthlyCalendarDate
