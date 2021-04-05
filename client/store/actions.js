import { ADD_CAMPUS, ADD_STUDENT, DELETE_CAMPUS, DELETE_STUDENT, LOAD_CAMPUSES, LOAD_STUDENTS } from "./actionTypes"


export const _loadCampuses = (campuses) => {
    return {
        type: LOAD_CAMPUSES,
        campuses
    }
}

export const _loadStudents = (students) => {
    return {
        type: LOAD_STUDENTS,
        students
    }
}

export const _addCampus = (campus) => {
    return {
        type: ADD_CAMPUS,
        campus
    }
}

export const _addStudent = (student) => {
    return {
        type: ADD_STUDENT,
        student
    }
}

export const _deleteCampus = async(campus) => {
    return {
        type: DELETE_CAMPUS,
        campus
    }
}

export const _deleteStudent = async(student) => {
    return {
        type: DELETE_STUDENT,
        student
    }
}