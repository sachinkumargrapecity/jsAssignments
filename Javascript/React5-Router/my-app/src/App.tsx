import React, { Component } from 'react';
import './App.css';
import { ShowIssues } from "./components";
import { Provider } from 'react-redux';
import { store } from './store/createStore';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ShowIssues></ShowIssues>
        </div>
      </Provider>
    );
  }
}

export default App;
