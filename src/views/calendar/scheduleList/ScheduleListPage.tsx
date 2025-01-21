import React, { useEffect } from 'react'
import useScheduleListViewModel from '@views/calendar/scheduleList/useScheduleListViewModel'
import './scheduleListPage.scss'

const ScheduleListPage: React.FC = () => {
  const { calculatedSchedules, init } = useScheduleListViewModel()

  useEffect(() => {
    init()
  }, [])

  const sortedScheduleEntries = Array.from(calculatedSchedules.entries()).map(
    ([key, schedules]) => ({
      key,
      schedules: schedules.sort(
        (a, b) => new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime(),
      ),
    }),
  )

  return (
    <div className="schedule-list">
      {sortedScheduleEntries.map(({ key, schedules }) => (
        <div key={key} className="schedule-list__group">
          <h2 className="schedule-list__group-title">{key}</h2>
          {schedules.map(schedule => (
            <div key={schedule.id} className="schedule-list__schedule">
              <div className="schedule-list__schedule-time-title">
                <div className="schedule-list__schedule-title">{schedule.title}</div>
                <div className="schedule-list__schedule-time">
                  {schedule.startedAt} ~ {schedule.endedAt}
                </div>
              </div>
              <div className="schedule-list__schedule-contents">{schedule.contents}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default ScheduleListPage
