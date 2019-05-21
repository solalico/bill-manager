import React, {Component} from 'react'
import '../index.css'
import p1 from './1.jpeg'
import p2 from './2.jpeg'
import p3 from './3.jpeg'
import { dbRef, billRef } from '../../../firebase';

const pageData = {
  1: {
    name: 'Brunch',
    tax: 8,
    tips: 18,
    share: [],
    src: p1,
    url: '',
  },
  2: {
    name: '街边龙虾cafe',
    tax: 8,
    tips: 18,
    share: [],
    src: p2,
    url: '',
  },
  3: {
    name: 'Portland Oyster',
    tax: 8,
    tips: 18,
    url: '',
    share: [
      {
        description: 'Oyster',
        value: 87,
      },
      {
        description: 'Clam bake',
        value: 34,
      },
    ],
    src: p3,
  },
}

export default class HelloWorld extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      bill: {},
      page: 0,
      inputField: '',
      description: '',
      backDes: '',
      modalOpen: false,
    }
    this.addBill = this.addBill.bind(this)
    this.deleteBill = this.deleteBill.bind(this)
    this.renderEntry = this.renderEntry.bind(this)
    this.renderPage = this.renderPage.bind(this)
    this.renderPageSum = this.renderPageSum.bind(this)
    this.renderSummary = this.renderSummary.bind(this)
    this.saveBill = this.saveBill.bind(this)
    this.renderFinal = this.renderFinal.bind(this)
  }

  saveBill() {
    const {name,page} = this.state
    let res = 0

    const bill = {
      name,
      detail: pageData,
    }
    billRef.push(bill)
    this.setState({
      page: page + 1
    })
  }

  addBill() {
    const {bill, page, inputField, description} = this.state
    if (!inputField) return
    bill[page] = bill[page] || {}
    bill[page].items = bill[page].items || []
    bill[page].items.push({
      value: inputField,
      description,
    })
    this.setState(
      {
        bill,
        inputField: '',
        description: '',
      }
    )
  }

  deleteBill(e) {
    const {bill, page, inputField} = this.state
    bill[page] = bill[page] || {}
    bill[page].items = bill[page].items || []
    bill[page].items.splice(e.target.id, 1)
    this.setState(
      {
        bill
      }
    )
  }

  render() {
    const {bill, page} = this.state
    if(page === 0) return this.renderEntry()
    if(page === 4) return this.renderSummary()
    if(page === 5) return this.renderFinal()
    return this.renderPage()
  }

  renderPage() {
      const {bill, page, name, modalOpen} = this.state
      const current = pageData[page]
      if (!current) return null
      if (modalOpen) {
        return (
          <div id="myModal" className="modal">
            <span onClick={e=> this.setState({modalOpen: false})} className="close">&times;</span>
            <img className="modal-content" id="img01" src={current.src}/>
            <div id="caption"></div>
          </div>
        )
      }
    return (
      <div className="container">
        <div className="leftContainer">
          <div className="imgContainer">
            <img onClick={e=> this.setState({modalOpen: true})} className="img" src={current.src} />
          </div>
        </div>
        <div className="rightContainer">
          <div className="info">
           <p>
            {
             `你好呀${name}~`
            }
            <br/>
            {
              `你总共有3个账单，这是第${page}个～`
            }
            <br/>
            以下是项目会在最后自动加入账单中～
            <br/>
            共享的食物按照7人分摊～
           </p>
           <ul className="list-group">
             <li className="list-group-item">
               {`Tax: ${current.tax}%`}
             </li>
             <li className="list-group-item">
               {`Tips: ${current.tips}%`}
             </li>
              {
                current.share.map(item => {
                  return (
                    <li className="list-group-item">
                      {`${item.description}: $${item.value}`}
                    </li>
                  )
                })
              }
           </ul>
          </div>
          <div className="selection">
            <div className="inputField">
              <label for="inputField">输入金额</label>
              <input id="inputField" type="number" style={{'width': '30%'}} onChange={(e) => this.setState({inputField: e.target.value})} value={this.state.inputField}/>
                <label for="inputField">描述</label>
                <input id="description" style={{'width': '35%'}} placeholder="可以不写～" onChange={(e) => this.setState({description: e.target.value})} value={this.state.description}/>
              <button className="btn btn-primary floatRight" onClick={this.addBill}>Add</button>
            </div>
            <div className="pageSum">
            {
              bill[page] && bill[page].items && bill[page].items.length > 0 && <table className="table .table-striped">
                <col width="35%"/>
                <col width="30%"/>
                <col width="35%"/>
                <col width="40%"/>
                <tr>
                  <td>ID</td>
                  <td>DESCRIPTION</td>
                  <td>VALUE</td>
                  <td>
                    DELETE
                  </td>
                </tr>
                  {
                    bill[page] && bill[page].items.map((item, index) => {
                      return (
                        <tr>
                          <td>{index+1}</td>
                          <td>{item.description}</td>
                          <td>{`$${item.value} `}</td>
                          <td>
                            <button className="btn btn-danger" id={index} onClick={this.deleteBill}>Delete</button>
                          </td>
                        </tr>
                      )
                    })
                  }
                </table>
            }
            </div>
          </div>
          <div className="buttonSection">
            <button className="btn floatRight btn-success" onClick={(e) => this.setState({page: this.state.page+1})}>Next</button>
            <button className="btn floatRight" onClick={(e) => this.setState({page: this.state.page-1})}>Back</button>
          </div>
        </div>
      </div>
    )
  }

  renderEntry() {
    const {name} = this.state
    return (
      <div className="intro">
      <div>
        <h2>
          你是谁呀?
        </h2>
      </div>
      <div className="form-group">
        <input id="amount"
          className="form-control"
          value = {name}
          placeholder="你的名字"
          onChange={event => this.setState({name: event.target.value})}
        />
        {
          name && <button className="btn floatRight goBtn btn-success" onClick={(e) => this.setState({page: this.state.page+1})}>好了好了我知道了快点我</button>
        }
      </div>
      </div>
    )
  }

  renderSummary() {
    const {name, bill} = this.state
    return (
      <div className="finalSummary">
        <div className="info">
        <h3>
          {
            `好啦亲爱的${name}`
          }
        </h3>
        <br/>
        <h5>
        以下是你的账单，确认完后请点击确认，我会将数据保存下来，然后记录在splitwise上～
        </h5>
        <button className="btn floatRight btn-success" onClick={this.saveBill}>确认没有错，提交！！</button>
        </div>
        <div className="info">
          {
            Object.keys(bill).map(key => this.renderPageSum(key))
          }
        </div>
        <div className="total">
          <h2>
         {
           `你的总金额是: $${getTotal(pageData).toFixed(2)}`
         }
         </h2>
        </div>
        <div className="input-group">
          <div className="input-group-prepend">
            <span className="input-group-text">写下备注，告诉我账单上体现不出来的东西～</span>
          </div>
          <textarea onChange={e => this.setState({backDes: e.target.value})} className="form-control" aria-label="With textarea"></textarea>
        </div>
      </div>
    )

    function getTotal(items) {
      let res = 0
      Object.keys(items).forEach(key => {
        if (!items[key].grantTotal) return
        res += items[key].grantTotal*1
      })
      items.total = res
      return res
    }
  }

  renderFinal() {
    return (
      <div className="intro">
      <div>
        <h3>
          拜拜～ <br/>点击下面按钮可以再来一次～
        </h3>
        <button className="btn btn-success" onClick={goBack}>填表一直爽，一直填一直爽</button>
      </div>

      </div>
    )
  }

  renderPageSum(idx, cb) {
    const current = pageData[idx]
    const {bill, name} = this.state
    let total = 0
    bill[idx].items && bill[idx].items.forEach(item => {
      total += item.value * 1
    })
    current.share && current.share.forEach(item => {
      total += (item.value/7).toFixed(2) * 1
    })
    total = total.toFixed(2)
    const tax = (total * current.tax / 100).toFixed(2)
    const tips = (total * current.tips / 100).toFixed(2)
    current.taxTotal = tax
    current.tipsTotal = tips
    current.total = total
    const grantTotal = (total*1 + tips*1 + tax*1).toFixed(2)
    current.grantTotal = grantTotal
    return (
      <div>
        <h3>
          {current.name}
        </h3>
        <table className="table .table-striped">
          <col width="35%"/>
          <col width="30%"/>
          <tr>
            <td>DESCRIPTION</td>
            <td>VALUE</td>
          </tr>
          {
            bill[idx].items && bill[idx].items.map((item, index) => {
              return (
                <tr>
                  <td>{item.description}</td>
                  <td>{`$${item.value}`}</td>
                </tr>
              )
            })
          }
          {
            current.share && current.share.map((item, index) => {
              return (
                <tr>
                  <td>{item.description + '(shared)'}</td>
                  <td>{'$' + (item.value/7).toFixed(2)}</td>
                </tr>
              )
            })
          }
          <tr>
            <td>Tax</td>
            <td>{'$' + tax}</td>
          </tr>
          <tr>
            <td>Tips</td>
            <td>{'$' + tips}</td>
          </tr>
          <tr>
            <td><b>Total before tax and tips</b></td>
            <td>{'$' + total}</td>
          </tr>
          <tr>
            <td><b>Total after tax and tips</b></td>
            <td>{'$' + grantTotal}</td>
          </tr>
          </table>
      </div>
    )
  }
}

function goBack() {
  window.location.replace('/')
}
