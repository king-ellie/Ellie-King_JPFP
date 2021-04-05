import axios from 'axios'
import React from 'react';
import { Link } from 'react-router-dom'

class CampusStudent extends React.Component {
    constructor(props) {
        super(props)
        this.id = this.props.student.id
        this.campusId = this.props.student.campusId
        this.handleClick = this.handleClick.bind(this)
    }

    async handleClick(){
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