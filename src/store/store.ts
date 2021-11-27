import {tasksReducer} from './tasks-reducer';
import {todoListsReducer} from './todolists-reducer';
import {applyMiddleware, combineReducers, createStore} from 'redux'

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
})
// непосредственно создаём store
export const store = createStore(rootReducer, applyMiddleware());
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;