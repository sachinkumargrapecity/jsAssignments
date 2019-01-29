import React, { Component } from 'react';
import { createStore } from 'redux';
import AddTodo from './components/AddTodo';
import './App.css';
import ShowTodo from './components/ShowTodo';

class App extends Component {

  reducerFunction(state = [], action) {
    switch (action.type) {
      case 'add': {
        return ([
          ...state,
          {
            ...action.todo,
            done: false
          }
        ]);
      }
      case 'done': {
        let newState = state.map((item, index) => {
          if (item.id === action.id) {
            return {
              ...item,
              done: true
            }
          }
          return item;
        })
        return newState;
      }
      default: {
        return state;
      }
    }
  }

  render() {
    let storage = createStore(this.reducerFunction);
    return (
      <div id="app">
        <AddTodo storage={storage}></AddTodo>
        <ShowTodo storage={storage}></ShowTodo>
      </div>
    );
  }
}


export default App;
