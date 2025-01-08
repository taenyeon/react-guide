import AuthHandlers from './handlers/AuthHandlers'
import HandlerInterceptor from './handlers/HandlerInterceptor'

const handlers = [HandlerInterceptor, ...AuthHandlers]

export default handlers
