import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'
import { HashRouter as Router, Link} from 'react-router-dom'
import AddCampus from './AddCampus'

import {_deleteCampus, _loadCampuses} from '../store/actions'

class CampusList extends React.Component {
    constructor(props) {
        super(props)
    }
    async componentDidMount() {
        await this.props.loadCampuses()
    }
    render() {
        return (
            <Router>
                <div>
                    <h1>All Campuses</h1>
                    <AddCampus />
                    {this.props.campuses.map( campus => {
                        const campusUrl = `/campuses/${campus.id}`
                        return (
                            <div key={campus.id} className='listed-campus'>
                                <img src={campus.imageUrl}></img>
                                <ul>
                                    <Link to={campusUrl}>
                                        <li>{campus.name}</li>
                                    </Link>
                                    <li>{campus.address}</li>
                                    <button onClick={() => this.props.deleteCampus(campus.id)}>Delete Campus</button>
                                </ul>
                            </div>
                        )
                    })}
                </div>
            </Router>
        )
    }
}


const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        loadCampuses: async() => {
            const campuses = (await axios.get('/api/campuses')).data
            dispatch(await _loadCampuses(campuses))
        },
        deleteCampus: async(id) => {
            const campus = (await axios.delete(`/api/campuses/${id}`)).data
            dispatch(await _deleteCampus(campus))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusList);
