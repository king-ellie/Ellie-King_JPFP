import { createStore, combineReducers } from 'redux'

const LOAD_CAMPUSES = 'LOAD_CAMPUSES'
const LOAD_STUDENTS = 'LOAD_STUDENTS'
const ADD_CAMPUS = 'ADD_CAMPUS'
const ADD_STUDENT = 'ADD_STUDENT'
const DELETE_CAMPUS = 'DELETE_CAMPUS'
const DELETE_STUDENT = 'DELETE_STUDENT'

const campusesReducer = (state = [], action) => {
    if (action.type === LOAD_CAMPUSES){
        state = action.campuses
    }
    if (action.type === ADD_CAMPUS){
        state = [...state, action.campus]
    }
    if (action.type === DELETE_CAMPUS){
        const newState = [...state]
        for (let i = 0; i < state.length; i++){
            const currCampus = state[i]
            if (currCampus.id === action.campus.id){
                newState.splice(i, 1)
            }
        }
        state = newState
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
    if (action.type === DELETE_STUDENT){
        const newState = [...state]
        for (let i = 0; i < state.length; i++){
            const currStudent = state[i]
            if (currStudent.id === action.student.id){
                newState.splice(i, 1)
            }
        }
        state = newState
    }
    return state
}

const comboReducer = combineReducers ({
    campuses: campusesReducer,
    students: studentsReducer
})

const store = createStore(comboReducer)

export default store

