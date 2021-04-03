import React from 'react';
import { HashRouter as Router, Route, Link} from 'react-router-dom'
import CampusList from './CampusList'
import StudentList from './StudentList'
import SingleCampus from './SingleCampus'
import SingleStudent from './SingleStudent';
import { connect } from 'react-redux'
import { _loadStudents } from '../store/actions'

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    
    return (
      <Router>
        <div id='app'>
          <h1 id='header'>Campus App</h1>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/campuses'>Campuses</Link>
            <Link to='/students'>Students</Link>
          </nav>
          <Route component={ CampusList } path='/campuses' exact/>
          <Route component={ StudentList } path='/students' exact/>
          <Route component={ SingleCampus } path='/campuses/:id'/>
          <Route component={ SingleStudent} path='/students/:id'/>
        </div>
      </Router>
    );
  }
};

const mapStateToProps = (state) => state

export default connect(mapStateToProps)(App);