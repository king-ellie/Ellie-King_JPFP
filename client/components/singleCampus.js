import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class singleCampus extends React.Component {
    constructor(props) {
        super(props)
        this.campusId = this.props.match.params.id
    }
    async componentDidMount() {
        await this.props.loadCampus(this.campusId)
    }
    render() {
        if (!this.props.campuses){
            return <h1>...Loading</h1>
        }
        return (
            <div>
                {this.props.campuses.map( campus => {
                    return (
                        <div key={campus.id}>
                            <div>
                                <h1>{campus.name}</h1>
                                <img src={campus.imageUrl}></img>
                                <p>{campus.description}</p>
                                <h4>{campus.address}</h4>
                            </div>
                            <div id='studentsContainer'>
                                {campus.students.map( student => {
                                    let studentUrl = `/students/${student.id}`
                                    return (
                                        <div key={student.id} className='student'>
                                            <img src={student.imageUrl} ></img>
                                            <Link to={studentUrl}><h4>{student.firstName} {student.lastName}</h4></Link>
                                        </div>
                                    )
                                })}
                            </div>
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
        loadCampus: async(id) => {
            const campuses = (await axios.get(`/api/campuses/${id}`)).data
            dispatch({
                type: 'LOAD_CAMPUSES',
                campuses
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(singleCampus);
