import AuthHandlers from './handlers/AuthHandlers'
import HandlerInterceptor from './handlers/HandlerInterceptor'
import ScheduleHandlers from './handlers/ScheduleHandlers'
import HolidayHandlers from './handlers/HolidayHandlers'

const handlers = [HandlerInterceptor, ...AuthHandlers, ...ScheduleHandlers, ...HolidayHandlers]

export default handlers
