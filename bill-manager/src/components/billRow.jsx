import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { deleteReminder } from '../actions';

class billRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bills: [],
      total: '0.00'
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({bills: nextProps.bills});
    this.setState({total: nextProps.total});
  }

  deleteReminder(id) {
    this.props.deleteReminder(id);
  }

  render() {
    const { total } = this.props;
    const tempBill = this.props.bills;
    let bills = [];
    tempBill.forEach((bill)=> {
      bills.push(bill);
    });
    return (
      <table className="billTable table-striped table-bordered table-condensed table-hover">
        <thead>
          <tr>
            <th>
              Amount
            </th>
            <th>
              PaidBy
            </th>
            <th>
              Obligors
            </th>
            <th>
              Description
            </th>
            <th>
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
            {
              bills.map((reminder, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <div className="wordWrap">{reminder.amount}</div>
                    </td>
                    <td>
                      <div className="wordWrap">{reminder.paidBy}</div>
                    </td>
                    <td>
                      <div className="wordWrap">{
                          reminder.obligors.toString()
                        }</div>
                    </td>
                    <td>
                      <div className="wordWrap">{reminder.description}</div>
                    </td>
                    <td
                      onClick={() => this.deleteReminder(index)}
                      >
                      &#x2715;
                    </td>
                  </tr>
                )
              })
            }
            <tr key="lastRow">
              <td colSpan="4">
                <div className="wordWrap">Total</div>
              </td>
              <td>
                <div className="wordWrap">{total}</div>
              </td>
            </tr>
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    bills: state.bills,
    total: state.total
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({deleteReminder}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(billRow);
