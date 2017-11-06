import React, { Component } from 'react';
import classnames from 'classnames';
import HistoryRecord from './historyRecord';
class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const togglebarClasses = classnames({
      'sidebarOpen': this.props.toggleBar,
      'sidebarClose': !this.props.toggleBar,
      'togglebarMain': true
    });
    return (
      <div className={togglebarClasses}>
        <HistoryRecord />
      </div>
    )
  }
}

export default Sidebar;
