import AuthHandlers from './handlers/AuthHandlers'
import HandlerInterceptor from './handlers/HandlerInterceptor'
import ScheduleHandlers from './handlers/ScheduleHandlers'

const handlers = [HandlerInterceptor, ...AuthHandlers, ...ScheduleHandlers]

export default handlers
