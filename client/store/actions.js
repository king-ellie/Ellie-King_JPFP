

export const _loadCampuses = async(campuses) => {
    return {
        type: 'LOAD_CAMPUSES',
        campuses
    }
}

export const _loadStudents = async(students) => {
    return {
        type: 'LOAD_STUDENTS',
        students
    }
}

export const _addCampus = async(campus) => {
    return {
        type: 'ADD_CAMPUS',
        campus
    }
}

export const _addStudent = async(student) => {
    return {
        type: 'ADD_STUDENT',
        student
    }
}