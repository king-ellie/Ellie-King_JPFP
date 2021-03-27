import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'

class campusList extends React.Component {
    constructor(props) {
        super(props)
    }
    async componentDidMount() {
        await this.props.loadCampuses()
    }
    render() {
        return (
            <div>
                <h1>All Campuses</h1>
                {this.props.campuses.map( campus => {
                    return (
                        <div key={campus.id}>
                            <img src={campus.imageUrl}></img>
                            <ul>
                                <li>{campus.name}</li>
                                <li>{campus.address}</li>
                            </ul>
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
        loadCampuses: async() => {
        const campuses = (await axios.get('/api/campuses')).data
        dispatch({
            type: 'LOAD_CAMPUSES',
            campuses
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(campusList);
