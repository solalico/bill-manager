import React, { Component } from 'react';
import App from './App';
import Sidebar from './sidebar';
class Mainframe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleBar: true
    }
  }

  toggleBar() {
    this.setState({toggleBar: !this.state.toggleBar});
    console.log(this.state.toggleBar);
  }

  render() {
    const toggleBar = this.state.toggleBar;
    return (
      <div className="mainframe">
        <Sidebar toggleBar={toggleBar}/>
        <div className="togglebar">
          <button className="btn btn-info toggleButton" onClick={() => this.toggleBar()} >
            Toggle<br/>History<br/>Record
          </button>
        </div>
        <App toggleBar={toggleBar}/>
      </div>
    )
  }
}

export default Mainframe;
