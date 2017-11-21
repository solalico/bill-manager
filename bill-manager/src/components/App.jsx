import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import { addReminder } from '../actions';
import { firebaseApp } from '../firebase';
// import moment from 'moment';
import Billrow from './billRow';
import Summary from './summary'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      description: '',
      paidBy: '',
      obligors: [],
      email: '',
      RefKey: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({email: nextProps.email});
    this.setState({RefKey: nextProps.RefKey});
  }

  signOut() {
    firebaseApp.auth().signOut();
  }

  clearState() {
    this.setState({amount: ''})
    this.setState({description: ''})
    document.getElementById('amount').value = '';
    document.getElementById('des').value = '';
  }

  addReminder() {
    if (!this.state.amount || this.state.obligors.length === 0) return;
    this.props.addReminder(this.state.amount, this.state.description, this.state.paidBy, this.state.obligors, this.props.RefKey);
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
    const togglebarClasses = classnames({
      'appSidebarOpen': this.props.toggleBar,
      'aPPSidebarClose': !this.props.toggleBar,
      'App': true
    });
    const { email } = this.props;
    const { RefKey } = this.state;
    console.log(RefKey);
    return (
        RefKey ?
        <div className={togglebarClasses}>
          <div className="title">
             Welcome to Bill Manager! Account: {email}
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
              className="btn btn-success btncenter"
              onClick={() => {alert('D是不是最帅！')}}
              >
              别点我
            </div>
            <button
              className="btn btn-danger btncenter marginLeft"
              onClick={() => this.signOut()}
              >
              Sign Out
            </button>
          </div>
          <Summary />
        </div>
        :
        <div className="noRecord">Please select or add new bill.</div>
    )
  }
}

function mapStateToProps(state) {
  const { RefKey, email } = state;
  return {
    RefKey: state.RefKey,
    email: state.email
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({addReminder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
