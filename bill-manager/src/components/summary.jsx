import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

class Summary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      d2RGU: '0.00',
      d2EVA: '0.00',
      RGU2EVA: '0.00'
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({d2RGU: nextProps.d2RGU});
    this.setState({d2EVA: nextProps.d2EVA});
    this.setState({RGU2EVA: nextProps.RGU2EVA});
  }

  render() {
    return (
      <ListGroup className="summary">
        <ListGroupItem>
          <div className="textLeft">D to RGU: </div>
          <div className="textRight">{this.state.d2RGU}</div>
        </ListGroupItem>
        <ListGroupItem>
          <div className="textLeft">D to EVA: </div>
          <div className="textRight">{this.state.d2EVA}</div>
        </ListGroupItem>
        <ListGroupItem>
          <div className="textLeft">RGU to EVA: </div>
          <div className="textRight">{this.state.RGU2EVA}</div>
        </ListGroupItem>
      </ListGroup>
    )
  }
}

function mapStateToProps(state) {
  return {
    d2RGU: state.d2RGU,
    d2EVA: state.d2EVA,
    RGU2EVA: state.RGU2EVA
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
