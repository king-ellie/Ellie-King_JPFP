import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'

class studentList extends React.Component {
    constructor(props) {
        super(props)
    }
    async componentDidMount() {
        await this.props.loadStudents()
        console.log('this.props: ', this.props)
    }
    render() {
        return (
            <div>
                <h1>All Students</h1>
                <ul>
                    {this.props.students.map( student => {
                        return (
                        <li key={student.id}>{student.firstName} {student.lastName}</li>)
                    })}
                </ul>
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(studentList);
