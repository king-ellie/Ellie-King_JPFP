import { createStore, combineReducers } from 'redux'

const LOAD_CAMPUSES = 'LOAD_CAMPUSES'
const LOAD_STUDENTS = 'LOAD_STUDENTS'

const campusesReducer = (state = [], action) => {
    if (action.type === LOAD_CAMPUSES){
        return action.campuses
    } else return state
}

const studentsReducer = (state = [], action) => {
    if (action.type === LOAD_STUDENTS){
        return action.students
    } else return state
}

const comboReducer = combineReducers ({
    campuses: campusesReducer,
    students: studentsReducer
})

const store = createStore(comboReducer)

export default store

