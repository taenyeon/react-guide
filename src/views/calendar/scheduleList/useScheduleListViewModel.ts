import useScheduleStore from '@stores/useScheduleStore'
import { useShallow } from 'zustand/react/shallow'
import scheduleRepository from '@repositories/ScheduleRepository'
import dateFormatUtil from '@utils/date/dateFormatUtil'
import { useMemo } from 'react'
import dayjs from 'dayjs'
import { Schedule } from '@typings/Schedule'

const useScheduleListViewModel = () => {
  const { getStringToDate } = dateFormatUtil
  const { schedules, setSchedules } = useScheduleStore(
    useShallow(state => ({
      schedules: state.schedules,
      setSchedules: state.setSchedules,
    })),
  )

  const init = async () => {
    const scheduleList = await scheduleRepository.findAll()
    setSchedules(
      scheduleList.sort((a, b) =>
        getStringToDate(a.startedAt).isAfter(getStringToDate(b.startedAt)) ? 1 : -1,
      ),
    )
  }
  const calculatedSchedules: Map<string, Schedule[]> = useMemo(() => {
    return schedules.reduce((map: Map<string, Schedule[]>, schedule) => {
      const startedAt: dayjs.Dayjs = getStringToDate(schedule.startedAt)
      const yyyymm = `${startedAt.year()}/${startedAt.month() + 1}`
      const scheduleList = map.get(yyyymm)
      if (scheduleList) scheduleList.push(schedule)
      else map.set(yyyymm, [schedule])
      return map
    }, new Map())
  }, [])

  return { schedules, calculatedSchedules, init }
}

export default useScheduleListViewModel
