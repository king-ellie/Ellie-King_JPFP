import React from 'react';
import { HashRouter as Router, Route, Link} from 'react-router-dom'
import campusList from './campusList'
import studentList from './studentList'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props){
    super(props)
  }

  render () {
    
    return (
      <Router>
        <div>
          <h1>Campus App</h1>
          <nav>
            <Link to='/'>Home</Link>
            <Link to='/campuses'>Campuses</Link>
            <Link to='/students'>Students</Link>
          </nav>
          <Route component ={ campusList } path='/campuses'/>
          <Route component ={ studentList } path='/students'/>
        </div>
      </Router>
    );
  }
};

const mapStateToProps = (state) => state
export default connect(mapStateToProps)(App);