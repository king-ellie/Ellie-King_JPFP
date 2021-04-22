import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { _loadStudents, _loadCampuses } from '../store/actions'
import UpdateStudent from './UpdateStudent';

class SingleStudent extends React.Component {
    constructor(props) {
        super(props)
        //studentId should be inside of state
        this.studentId = this.props.match.params.id
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {
        await this.props.loadStudents(this.studentId)
        await this.props.loadCampuses()
    }

    async handleSubmit(event) {
        event.preventDefault()
        const { chosenCampus } = this.state
        try{
            if (chosenCampus !== '0'){
                const newStudent = (await axios.put(`/api/students/${this.studentId}`, {
                    chosenCampus
                })).data
                await this.props.loadStudents(newStudent.id)
            }
        }
        catch(error){
            console.log('HANDLE SUBMIT ERROR: ', error)
        }
    }

    handleChange(event) {
        /*it's bad practice to directly modify the state like this.
        if you want something to be apart of the state, you should initialize it first within the constructor.

        which would look like this:
            this.state = {
                chosenCampus = ''
            }

        then, you should only modify it using this.setState()...
        so this should be:
        this.setState({chosenCampus: event.target.value})
        */
        this.state.chosenCampus = event.target.value
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
                            <UpdateStudent student={student}/>
                            {student.campus === null
                            ? <div>
                                <h5>This student is not registered to a campus.</h5>
                                <form onSubmit={this.handleSubmit}>
                                    <label htmlFor='register'>Register this student: </label>
                                    <select name='register' onChange={this.handleChange}>
                                        <option value='0' >--select a campus--</option>
                                        {this.props.campuses.map( campus => {
                                            return (
                                                <option key={campus.id} value={campus.id}>{campus.name}</option>
                                            )
                                        })}
                                    </select>
                                    <button>Register</button>
                                </form>
                            </div>
                            : <p>{student.firstName} is registered to a campus: <Link to={`/campuses/${student.campus.id}`}>{student.campus.name}</Link></p>
                            }
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
        },
        loadCampuses: async() => {
            const campuses = (await axios.get('/api/campuses')).data
            dispatch(await _loadCampuses(campuses))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
