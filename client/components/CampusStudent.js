import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class CampusStudent extends React.Component {
    constructor(props) {
        super(props)
        this.id = this.props.student.id
    }
    
    render() {
        let studentUrl = `/students/${this.id}`
        return (
            <div key={this.id} className='student'>
                <img src={this.props.student.imageUrl} ></img>
                <Link to={studentUrl}><h4>{this.props.student.firstName} {this.props.student.lastName}</h4></Link>
            </div>
        )
    } 
}

export default CampusStudent