import React from 'react'
import { Link } from 'react-router'
import AuthenticatedView from '../AuthenticatedView'

class Home extends React.Component {
  render () {
    return (
      <div id="home" className="home usa-grid">
        <div id="info" className="info usa-width-one-whole">
          <h2>Home</h2>
          <div><Link to="/help">Help</Link></div>
        </div>
      </div>
    )
  }
}

export default AuthenticatedView(Home)
