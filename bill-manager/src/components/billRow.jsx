import React, { Component } from 'react';
import { connect } from 'react-redux';

class billRow extends Component {

  render() {
    const bills = this.props.bills;
    console.log('In bill', bills);
    return (
      <table className="table-striped table-bordered table-condensed table-hover">
        <thead>
          <tr>
            <th>
              Amount
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
              bills.map(reminder => {
                return (
                  <tr key={reminder.id}>
                    <td>
                      <div className="wordWrap">{reminder.amount}</div>
                    </td>
                    <td>
                      <div className="wordWrap">{reminder.description}</div>
                    </td>
                    <td
                      onClick={() => this.deleteReminder(reminder.id)}
                      >
                      &#x2715;
                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    bills: state.bills
  }
}

export default connect(mapStateToProps, null)(billRow);
