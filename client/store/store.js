import { createStore } from 'redux'

const LOAD_CAMPUSES = 'LOAD_CAMPUSES'

const initialState = {
    campuses: [],
    students: []
}

const reducer = (state = initialState, action) => {
    if (action.type === LOAD_CAMPUSES){
        return {...state, campuses: action.campuses}
    }
    else return state
}

const store = createStore(reducer)

export default store

