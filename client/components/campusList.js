import axios from 'axios'
import React from 'react';
import { connect } from 'react-redux'

class campusList extends React.Component {
    constructor(props) {
        super(props)
    }
    async componentDidMount() {
        await this.props.loadCampuses()
        console.log('this.props: ', this.props)
    }
    render() {
        return (
            <div>
                <h1>All Campuses</h1>
                <ul>
                    {this.props.campuses.map( campus => {
                        return (<li key={campus.id}>{campus.name}</li>)
                    })}
                </ul>
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
