import axios from 'axios'
import React from 'react';
import { _addStudent } from '../store/actions';
import { connect } from 'react-redux'

class AddStudent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            imageUrl: 'default-student.jpg'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        try{
            const { firstName, lastName, email, imageUrl } = this.state
            const newStudent = (await axios.post('/api/students', {
                firstName,
                lastName,
                email,
                imageUrl
            })).data

            await this.props.addStudent(newStudent)

            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                imageUrl: 'default-student.jpg'
            })
        }
        catch(error){
            console.log('HANDLE SUBMIT ERROR: ', error)
        }
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='firstName'>First Name: </label>
                    <input required
                        name='firstName' 
                        value={this.state.firstName} 
                        onChange={this.handleInputChange} 
                        type='text' 
                     />
                    
                    <label htmlFor='lastName'>Last Name: </label>
                    <input required
                        name='lastName' 
                        value={this.state.lastName} 
                        onChange={this.handleInputChange} 
                        type='text' 
                    />

                    <label htmlFor='email'>Email: </label>
                    <input required
                        name='email' 
                        value={this.state.email} 
                        onChange={this.handleInputChange} 
                        type='text' 
                    />

                    <button>Add Student</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addStudent: async(newStudent) => {
            dispatch(await _addStudent(newStudent))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddStudent)
