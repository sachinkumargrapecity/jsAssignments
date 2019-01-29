import React, { Component } from 'react';
import './App.css';
import { ShowIssues,SingleIssueInfo } from "./components";
import { Provider } from 'react-redux';
import { store } from './store/createStore';
import {Router, Route} from 'react-router-dom';
import {history} from './components/';
class App extends Component {
  render() {
    return (
      <Router history={history}>
      <Provider store={store}>
        <Route exact path="/" component={ShowIssues}></Route>
        <Route path="/issueInfo" component={SingleIssueInfo}></Route>
      </Provider>
      </Router>
    );
  }
}

export default App;
