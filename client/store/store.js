import { createStore } from 'redux'

const LOAD_CAMPUSES = 'LOAD_CAMPUSES'
const LOAD_STUDENTS = 'LOAD_STUDENTS'

const initialState = {
    campuses: [],
    students: []
}

const reducer = (state = initialState, action) => {
    if (action.type === LOAD_CAMPUSES){
        return {...state, campuses: action.campuses}
    }
    if (action.type === LOAD_STUDENTS){
        return {...state, students: action.students}
    }
    else return state
}

const store = createStore(reducer)

export default store

