import axios from 'axios'
import React from 'react';
import { _addCampus } from '../store/actions';
import { connect } from 'react-redux'

class AddCampus extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            campusName: '',
            address: '',
            description: '',
            imageUrl: 'default-campus.jpg'
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        try{
            const { campusName, address, description } = this.state
            const newCampus = (await axios.post('/api/campuses', {
                campusName,
                address,
                description
            })).data
            await this.props.addCampus(newCampus)

            this.setState( {
                campusName: '',
                address: '',
                description: '',
                imageUrl: 'default-campus.jpg'
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
                    <label htmlFor='campusName'>Campus Name: </label>
                    <input required
                        name='campusName'
                        value={this.state.campusName}
                        onChange={this.handleInputChange}
                        type='text'
                     />

                    <label htmlFor='address'>Campus Address: </label>
                    <input required
                        name='address'
                        value={this.state.address}
                        onChange={this.handleInputChange}
                        type='text'
                    />

                    <label htmlFor='description'>Campus Description: </label>
                    <input
                        name='description'
                        value={this.state.description}
                        onChange={this.handleInputChange}
                        type='text'
                    />

                    <button>Add Campus</button>
                </form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addCampus: async (newCampus) => {
            //addCampus isn't an async function so you don't need await here
            dispatch(await _addCampus(newCampus))
        }
    }
}

export default connect(null, mapDispatchToProps)(AddCampus)
