import React from 'react'
import useSchedulePopupsViewModel from '@views/calendar/popup/useSchedulePopupsViewModel'
import ScheduleAddPopup from '@views/calendar/popup/scheduleAddPopup/ScheduleAddPopup'
import DateSchedulePopup from '@views/calendar/popup/dateSchedulePopup/DateSchedulePopup'
import ScheduleModifyPopup from '@views/calendar/popup/scheduleModifyPopup/ScheduleModifyPopup'

const SchedulePopups = () => {
  const { selectedDate, selectedSchedule, isOpenAddPopup } = useSchedulePopupsViewModel()
  return (
    <>
      {isOpenAddPopup && <ScheduleAddPopup />}
      {selectedDate && <DateSchedulePopup />}
      {selectedSchedule && <ScheduleModifyPopup />}
    </>
  )
}

export default SchedulePopups
