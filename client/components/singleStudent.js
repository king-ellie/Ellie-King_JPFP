import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class singleStudent extends React.Component {
    constructor(props) {
        super(props)
        this.studentId = this.props.match.params.id
    }
    async componentDidMount() {
        await this.props.loadStudents(this.studentId)
    }
    render() {
        console.log(this.props.students)
        return (
            <div>
                {this.props.students.map( student => {
                    const campusUrl = `/campuses/${student.campus.id}`
                    return (
                        <div key={student.id}>    
                            <img src={student.imageUrl}></img>
                            <h2>{student.firstName} {student.lastName}</h2>
                            <ul>
                                <li>GPA: {student.gpa}</li>
                                <li>Email: {student.email}</li>
                            </ul>
                            <p>{student.firstName} is registered to a campus: <Link to={campusUrl}>{student.campus.name}</Link></p>
                        </div>
                    )
                })}
            </div>
        )
    }
}


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        loadStudents: async(id) => {
            const students = (await axios.get(`/api/students/${id}`)).data
            dispatch({
                type: 'LOAD_STUDENTS',
                students
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleStudent);
