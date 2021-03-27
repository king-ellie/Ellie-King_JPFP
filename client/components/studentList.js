import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'

class studentList extends React.Component {
    constructor(props) {
        super(props)
    }
    async componentDidMount() {
        await this.props.loadStudents()
        await this.props.loadCampuses()
    }
    render() {
        return (
            <div>
                <h1>All Students</h1>
                {this.props.students.map( student => {
                    return (
                    <div key={student.id}>
                        <img src={student.imageUrl}></img>
                        <ul>
                            <li>{student.firstName} {student.lastName}</li>
                            <li>Email: {student.email}</li>
                            <li>Campus: {this.props.campuses.map(campus => {
                                if (campus.id === student.campusId){
                                    return campus.name
                                }
                            })}</li>
                        </ul>
                    </div>)
                })}
            </div>
        )
    }
}


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        loadStudents: async() => {
            const students = (await axios.get('/api/students')).data
            dispatch({
                type: 'LOAD_STUDENTS',
                students
                })
            },
        loadCampuses: async() => {
            const campuses = (await axios.get('/api/campuses')).data
            dispatch({
                type: 'LOAD_CAMPUSES',
                campuses
                })
            }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(studentList);
