import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { _loadStudents } from '../store/actions'

class SingleStudent extends React.Component {
    constructor(props) {
        super(props)
        this.studentId = this.props.match.params.id
    }
    async componentDidMount() {
        await this.props.loadStudents(this.studentId)
    }
    render() {
        return (
            <div>
                {this.props.students.map( student => {
                    return (
                        <div key={student.id}>    
                            <img src={student.imageUrl}></img>
                            <h2>{student.firstName} {student.lastName}</h2>
                            <ul>
                                <li>GPA: {student.gpa}</li>
                                <li>Email: {student.email}</li>
                            </ul>
                            {student.campus !== null 
                            ? <p>{student.firstName} is registered to a campus: <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link></p>
                            : <h5>This student is not registered to a campus.</h5>}
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
            dispatch(await _loadStudents(students))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
