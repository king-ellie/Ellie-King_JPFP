import { createStore, combineReducers } from 'redux'

const LOAD_CAMPUSES = 'LOAD_CAMPUSES'
const LOAD_STUDENTS = 'LOAD_STUDENTS'
const ADD_CAMPUS = 'ADD_CAMPUS'
const ADD_STUDENT = 'ADD_STUDENT'

const campusesReducer = (state = [], action) => {
    if (action.type === LOAD_CAMPUSES){
        state = action.campuses
    }
    if (action.type === ADD_CAMPUS){
        state = [...state, action.campus]
    }
    return state
}

const studentsReducer = (state = [], action) => {
    if (action.type === LOAD_STUDENTS){
        state = action.students
    }
    if (action.type === ADD_STUDENT){
        state = [...state, action.student]
    }
    return state
}

const comboReducer = combineReducers ({
    campuses: campusesReducer,
    students: studentsReducer
})

const store = createStore(comboReducer)

export default store

