import React from 'react';
import ReactDom from 'react-dom';
import Mainframe from './components/mainframe';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import { logUser } from './actions';
import './index.css';
import { Router, Route, browserHistory } from 'react-router'
import HelloWorld from './billClaimer/src/components/helloworld'
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { firebaseApp } from './firebase';

const store = createStore(reducer);

firebaseApp.auth().onAuthStateChanged(user => {
  if (user) {
    const { email } = user;
    store.dispatch(logUser(email));
    browserHistory.push('/bill-claimer');
  } else {
    browserHistory.replace('/signin');
  }
})

ReactDom.render(
  <Provider store={ store }>
    <Router path="/" history={browserHistory}>
      <Route path="/bill-claimer" component={HelloWorld} />
      <Route path="/bill-manager" component={Mainframe} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
    </Router>
  </Provider>,
  //   <App />

  document.getElementById('root')
)
