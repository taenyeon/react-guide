import React from 'react'
import { ScheduleOfDate } from '@typings/ScheduleOfDate'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import colorUtil from '@utils/color/colorUtil'
import { scheduleType } from '@typings/constants/ScheduleType'

interface MonthlyCalendarScheduleProps {
  schedule?: ScheduleOfDate
}

const MonthlyCalendarSchedule: React.FC<MonthlyCalendarScheduleProps> = ({ schedule }) => {
  if (!schedule) return <div className="monthly-calendar__schedule-empty" />
  const { getTime } = dateFormatUtil
  return (
    <div className="monthly-calendar__schedule">
      {!schedule.isMultiple && (
        <>
          <div className="monthly-calendar__schedule__title">{schedule.title}</div>
          <div className="monthly-calendar__schedule__time">
            {getTime(schedule.startHour, schedule.startMinute)} ~{' '}
            {getTime(schedule.endHour, schedule.endMinute)}
          </div>
        </>
      )}
      {schedule.isStart && (
        <>
          <div className="monthly-calendar__schedule__title">{schedule.title}</div>
          {schedule.type == scheduleType.TIME && (
            <div className="monthly-calendar__schedule__time">
              {getTime(schedule.startHour, schedule.startMinute)}
            </div>
          )}
        </>
      )}
      {schedule.isEnd && (
        <>
          <div className="monthly-calendar__schedule__title"></div>
          {schedule.type == scheduleType.TIME && (
            <div className="monthly-calendar__schedule__end-time">
              ends {getTime(schedule.endHour, schedule.endMinute)}
            </div>
          )}
        </>
      )}
      <div
        className="monthly-calendar__schedule__line"
        style={{
          left: `${schedule.startPercentage}%`,
          width: `${schedule.endPercentage - schedule.startPercentage}%`,
          backgroundColor: `${colorUtil.getIndexOfColor(schedule.order)}`,
        }}
      />
    </div>
  )
}

export default MonthlyCalendarSchedule
