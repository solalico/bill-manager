import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addReminder, retrieve, clearReminders } from '../actions';
// import moment from 'moment';
import Billrow from './billRow';
import Summary from './summary'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      description: '',
      total: 0,
      paidBy: '',
      obligors: [],
      d2RGU: 0.00,
      d2EVA: 0.00,
      RGU2EVA: 0.00
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({d2RGU: nextProps.d2RGU});
    this.setState({d2EVA: nextProps.d2EVA});
    this.setState({RGU2EVA: nextProps.RGU2EVA});
  }

  retrieve() {
    this.props.retrieve();
  }

  clearState() {
    this.setState({amount: ''})
    this.setState({description: ''})
    document.getElementById('amount').value = '';
    document.getElementById('des').value = '';
  }

  addReminder() {
    if (!this.state.amount || this.state.obligors.length === 0) return;
    this.props.addReminder(this.state.amount, this.state.description, this.state.paidBy, this.state.obligors);
    this.clearState();
  }

  isActive(value) {
    return 'radio-group ' + ((value === this.state.paidBy) ? 'active' : '');
  }

  toggleMember(value) {
    let newMember = [...this.state.obligors];
    if (newMember.includes(value)) {
      newMember.splice(newMember.indexOf(value), 1);
    } else {
     newMember.push(value);
   }
    this.setState({obligors: newMember});
  }

  isActiveObligor(value) {
    return 'radio-group ' + ((this.state.obligors.includes(value)) ? 'active' : '');
  }

  switchPayer(name) {
    this.setState({paidBy: name});
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
            className="btn btn-success marginLeft"
            onClick={() => this.addReminder()}
          >Add Records</button>
        </div>
        <div className="form-group marginBoth5" id="D">
          <div className="radio-group">
            <div className="radio-group marginBoth5 memberTitle">PaidBy:</div>
            <div className={this.isActive('D')} onClick={() => this.switchPayer('D')}>
              <div className="marginBoth5">D</div>
            </div>
            <div className={this.isActive('RGU')} id="RGU">
              <div className="marginBoth5" onClick={() => this.switchPayer('RGU')}>RGU</div>
            </div>
            <div className={this.isActive('EVA')} id="EVA">
              <div className="marginBoth5" onClick={() => this.switchPayer('EVA')}>EVA</div>
            </div>
          </div>
          <div className="radio-group">
            <div className="radio-group marginBoth5 memberTitle">Obligor: </div>
            <div className={this.isActiveObligor('D')} onClick={() => this.toggleMember('D')}>
              <div className="marginBoth5">D</div>
            </div>
            <div className={this.isActiveObligor('RGU')} id="RGU">
              <div className="marginBoth5" onClick={() => this.toggleMember('RGU')}>RGU</div>
            </div>
            <div className={this.isActiveObligor('EVA')} id="EVA">
              <div className="marginBoth5" onClick={() => this.toggleMember('EVA')}>EVA</div>
            </div>
          </div>
        </div>
        <Billrow/>
        <div className="buttonGroup">
          <div
            className="btn btn-danger btncenter"
            onClick={() => this.props.clearReminders()}
            >
            Clear Records
          </div>
          <div
            className="btn btn-success marginLeft btncenter"
            onClick={() => this.props.retrieve()}
            >
            Retrieve Records
          </div>
        </div>
        <Summary/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    bills: state.bills,
    d2RGU: state.d2RGU,
    d2EVA: state.d2EVA,
    RGU2EVA: state.RGU2EVA
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addReminder, retrieve, clearReminders}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
