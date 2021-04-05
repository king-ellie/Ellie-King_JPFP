import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import CampusStudent from './CampusStudent';
import UpdateCampus from './UpdateCampus';

class SingleCampus extends React.Component {
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
                                {campus.description
                                    ? <p>{campus.description}</p>
                                    : <p>This campus does not have a description.</p>
                                }
                                <h4>{campus.address}</h4>
                            </div>
                            <UpdateCampus campus={campus}/>
                            <div id='studentsContainer'>
                                {campus.students
                                ? campus.students.map( student => <CampusStudent key={student.id} student={student}/>) 
                                : <h5>This campus does not have any registered students.</h5>}
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
