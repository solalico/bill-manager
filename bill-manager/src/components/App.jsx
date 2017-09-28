import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder, deleteReminder, clearReminders } from '../actions';
// import moment from 'moment';
import Billrow from './billRow';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      description: '',
      total: 0
    }
  }

  clearState() {
    document.getElementById('amount').value = '';
    document.getElementById('des').value = '';
  }

  addReminder() {
    this.props.addReminder(this.state.amount, this.state.description);
    this.clearState();
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  render() {
    return (
      <div className="App">
        <div className="title">
          Bill Manager
        </div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input id="amount"
              type="number"
              className="form-control"
              placeholder="The amount is..."
              onChange={event => this.setState({amount: event.target.value})}
            />
          <input id="des"
            className="form-control"
            placeholder="This was for..."
            onChange={event => this.setState({description: event.target.value})}
          />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addReminder()}
          >Add Records</button>
        </div>
        <Billrow/>
        <div
          className="btn btn-danger"
          onClick={() => this.props.clearReminders()}
          >
          Clear Records
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bills: state.bills
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addReminder, deleteReminder, clearReminders}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
