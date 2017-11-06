import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { retrieveRecords, switchRecord } from '../actions';
import { dbRef, billRef } from '../firebase';
import { Tab, Row, Col, Nav, NavItem } from 'react-bootstrap';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

const template = {
  total: '0.00',
  d2RGU: '0.00',
  d2EVA: '0.00',
  RGU2EVA: '0.00',
  email: null,
  from: '',
  to: ''
}

class HistoryRecord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      historyRecords: [],
      modalIsOpen: false,
      newFrom: '',
      newTo: '',
      RefKey: ''
    }

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleTab = this.handleTab.bind(this);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.sortHistory = this.sortHistory.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#foo';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  save() {
    let temp = {...template};
    temp.from = this.state.newFrom;
    temp.to = this.state.newTo;
    billRef.push(temp);
    this.closeModal();
  }

  sortHistory(historyRecords) {
    historyRecords.sort((a, b) => {
      return (new Date(a.from)) < (new Date(b.from));
    });
  }

  componentDidMount() {
    billRef.on('value', snap => {
      if (snap.val() === null) return;
      let historyRecords = [];
      let temp = {};
      let id;
      Object.keys(snap.val()).forEach((key, index) => {
        temp[key] = snap.val()[key];
        temp[key].RefKey = key;
        historyRecords.push(temp[key]);
        if (this.state.RefKey === key) {
          id = index;
        }
      });
      this.sortHistory(historyRecords);
      this.setState({historyRecords});
      if (id === undefined && historyRecords.length !== 0) {
        console.log(historyRecords.length);
        this.props.switchRecord(historyRecords[0]);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({RefKey: nextProps.RefKey});
  }

  handleTab(index) {
    this.props.switchRecord(this.state.historyRecords[index]);
  }

  addNewRecord() {
    this.openModal();
  }

  deleteRecord(record) {
    const url = 'bills/' + record.RefKey;
    dbRef.ref(url).remove();
    if (this.state.historyRecords.length === 1) {
      this.setState({historyRecords: []});
    }
  }

  render() {
    const {historyRecords} = this.state;
    const parent = this;
    return (
      <div>
        <div>
          <button
            className="btn btn-success btncenter"
            onClick={() => this.addNewRecord()}
            >
            Add New
          </button>
        </div>
        <div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="0" onSelect={parent.handleTab}>
            <Row className="clearfix">
              <Col>
                <Nav bsStyle="pills" stacked>
                {
                  historyRecords.map((record, index) => {
                    const date = record.from.replace(new RegExp('-', 'g'), '/') + ' - ' + record.to.replace(new RegExp('-', 'g'), '/');
                    return (
                      <NavItem className="recordRowBorder" activeKey={index} key={index} eventKey={index}>
                        <div className="recordRow">
                          <div className="record">{date}</div>
                          <button
                            className="btn btn-danger btncenter recordRowDelete"
                            onClick={() => this.deleteRecord(record)}
                            >
                            Delete
                          </button>
                        </div>
                      </NavItem>
                    )
                  })
                }
                </Nav>
              </Col>
            </Row>
          </Tab.Container>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => this.subtitle = subtitle}> Add new bill</h2>
          <form>
            <label>From</label>
            <input
              className="form-control"
              type="date"
              onChange={event => this.setState({newFrom: event.target.value})}
            />
            <label>From</label>
            <input
              className="form-control"
              type="date"
              onChange={event => this.setState({newTo: event.target.value})}
            />
            <div className="buttonGroup">
              <div
                className="btn btn-danger btncenter"
                onClick={() => this.closeModal()}
                >
                Close
              </div>
              <button
                className="btn btn-success btncenter marginLeft"
                onClick={() => this.save()}
                >
                Save
              </button>
            </div>
          </form>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    RefKey: state.RefKey
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({retrieveRecords, switchRecord}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryRecord);
