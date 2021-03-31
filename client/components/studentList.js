import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import { HashRouter as Router, Link } from 'react-router-dom'

class studentList extends React.Component {
    constructor(props) {
        super(props)
    }
    async componentDidMount() {
        await this.props.loadStudents()
    }
    render() {
        return (
            <Router>   
                <div>
                    <h1>All Students</h1>
                    {this.props.students.map( student => {
                        const studentUrl = `/students/${student.id}`
                        return (
                        <div key={student.id}>
                            <img src={student.imageUrl}></img>
                            <ul>
                                <Link to={studentUrl}><li>{student.firstName} {student.lastName}</li></Link>
                                <li>Email: {student.email}</li>
                                <li>Campus: {student.campus.name}</li>
                            </ul>
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
            dispatch({
                type: 'LOAD_STUDENTS',
                students
            })
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(studentList);
