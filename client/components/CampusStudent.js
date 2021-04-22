import axios from 'axios'
import React from 'react';
import { Link } from 'react-router-dom'

class CampusStudent extends React.Component {
    constructor(props) {
        super(props)
        /*id and campusId should be in the state instead of
        just in the constructor */
        this.id = this.props.student.id
        this.campusId = this.props.student.campusId
        this.handleClick = this.handleClick.bind(this)
    }

    async handleClick() {
        /*all updates to your data should be handled by the redux store,
        so instead of making this axios call to the server directly in the component, it should pass through the redux store somehow. that means having an action for updating a student and dispatching that action in this component.

        in terms of your data flow, axios.put() returns whatever is sent back from the server.
        so instead of making another request to load the campus, you can do

        const updatedStudent = (await axios.put(`/api/students/${this.id}`, {
                unregister: 'yes'
            })).data
        then you dispatch the newly updated student to the store and handle the action in your reducer.*/
        await axios.put(`/api/students/${this.id}`, {
            unregister: 'yes'
        })
        this.props.loadCampus(this.campusId)
    }
    render() {
        let studentUrl = `/students/${this.id}`
        return (
            <div key={this.id} className='student'>
                <img src={this.props.student.imageUrl} ></img>
                <Link to={studentUrl}><h4>{this.props.student.firstName} {this.props.student.lastName}</h4></Link>
                <button onClick={this.handleClick}>Unregister</button>
            </div>
        )
    }
}

export default CampusStudent
