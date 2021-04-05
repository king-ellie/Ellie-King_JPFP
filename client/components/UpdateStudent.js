import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import { _loadStudents } from '../store/actions';

class UpdateStudent extends React.Component {
    constructor(props) {
        super(props)
        this.id = this.props.student.id
        this.state = {
            firstName: this.props.student.firstName,
            lastName: this.props.student.lastName,
            email: this.props.student.email
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        const { firstName, lastName, email } = this.state
        const updatedStudent = (await axios.put(`/api/students/${this.id}`, {
            firstName,
            lastName,
            email
        })).data
        await this.props.loadStudents(this.id)
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='name'>Edit First Name: </label>
                    <input required
                    name='firstName' 
                    value={this.state.firstName} 
                    onChange={this.handleInputChange} 
                    type='text' 
                />
                
                <label htmlFor='lastName'>Edit Last Name: </label>
                <input required
                    name='address' 
                    value={this.state.lastName} 
                    onChange={this.handleInputChange} 
                    type='text' 
                />

                <label htmlFor='email'>Edit Email: </label>
                <input required
                    name='email' 
                    value={this.state.email} 
                    onChange={this.handleInputChange} 
                    type='text' 
                />
                <button>Update Student</button>
            </form>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudent);
