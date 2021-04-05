import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import { _updateCampus } from '../store/actions';

class UpdateCampus extends React.Component {
    constructor(props) {
        super(props)
        if (this.props.campus.description === null){
            this.props.campus.description = ''
        }
        this.state = {
            campusName: this.props.campus.name,
            address: this.props.campus.address,
            description: this.props.campus.description,
            imageUrl: this.props.campus.imageUrl,
            id: this.props.campus.id
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault()
        const { campusName, address, description, id } = this.state
        const updatedCampus = (await axios.put(`/api/campuses/${id}`, {
            campusName,
            address,
            description
        })).data
        await this.props.loadCampus(id)
    }

    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor='campusName'>Edit Name: </label>
                    <input required
                    name='campusName' 
                    value={this.state.campusName} 
                    onChange={this.handleInputChange} 
                    type='text' 
                />
                
                <label htmlFor='address'>Edit Address: </label>
                <input required
                    name='address' 
                    value={this.state.address} 
                    onChange={this.handleInputChange} 
                    type='text' 
                />

                <label htmlFor='description'>Edit Description: </label>
                <input
                    name='description' 
                    value={this.state.description} 
                    onChange={this.handleInputChange} 
                    type='text' 
                />
                <button>Update Campus</button>
            </form>
        )
    }
}


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        loadCampus: async(id) => {
            const campuses = (await axios.get(`/api/campuses/${id}`)).data
            dispatch({
                type: 'LOAD_CAMPUSES',
                campuses
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCampus);
