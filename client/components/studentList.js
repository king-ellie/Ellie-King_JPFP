import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import { HashRouter as Router, Link } from 'react-router-dom'

import { _deleteStudent, _loadStudents } from '../store/actions'
import AddStudent from './AddStudent';

class StudentList extends React.Component {
    constructor(props) {
        super(props)
    }
    async componentDidMount() {
        try{
            await this.props.loadStudents()
        }
        catch(error){
            console.log('STUDENTLIST DIDMOUNT ERROR: ', error)
        }
    }
    render() {
        return (
            <Router>   
                <div>
                    <h1>All Students</h1>
                    <AddStudent />
                    {this.props.students.map( student => {
                        const studentUrl = `/students/${student.id}`
                        return (
                        <div key={student.id}>
                            <img src={student.imageUrl}></img>
                            <ul>
                                <Link to={studentUrl}><li>{student.firstName} {student.lastName}</li></Link>
                                <li>Email: {student.email}</li>
                                {student.campusId
                                ? <li>Campus: {student.campus.name}</li> 
                                : <h5>This student is not registered to a campus.</h5>}
                            </ul>
                            <button onClick={() => this.props.deleteStudent(student.id)}>Delete Student</button>
                        </div>)
                    })}
                </div>
            </Router> 
        )
    }
}


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        loadStudents: async() => {
            const students = (await axios.get('/api/students')).data
            dispatch(await _loadStudents(students))
        },
        deleteStudent: async(id) => {
            const student = (await axios.delete(`/api/students/${id}`)).data
            dispatch(await _deleteStudent(student))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
