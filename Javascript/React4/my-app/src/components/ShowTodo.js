import React, { Component } from 'react';
import './ShowTodo.css';

class ShowTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            showAll: false
        }
        this.updatePage = this.updatePage.bind(this);
    }
    render() {
        this.props.storage.subscribe(this.updatePage);
        const currentTodos = this.props.storage.getState();
        let displayTodos = [];

        if (!currentTodos) {
            return null;
        }

        if (!this.state.showAll) {
            displayTodos = currentTodos.filter(item => !item.done);
        } else {
            displayTodos = currentTodos;
        }

        return<div>
            <form>
                <input type="checkbox" onChange={this.changeHandler}></input>ShowAll
            </form>
            {displayTodos.map((item, i) => <div><span key={item.id} id="todo" onClick={() => {
                console.log('this is our clicked item...', item);
                this.props.storage.dispatch({ type: 'done', id: item.id })
            }}>{item.title}</span></div>)}</div>; 
           
            
            
    }

    updatePage() {
        // this function will show all the data stored in todos
        let styledToDos = [];

        for (let i = 0; i < this.props.storage.getState().length; i++) {
            if (!this.state.showAll) {
                if (!this.props.storage.getState()[i].done) {
                    styledToDos.push(this.props.storage.getState()[i]);
                }
            }
            else {
                styledToDos.push(this.props.storage.getState()[i]);
            }
        }

        this.setState({ todos: styledToDos });
    }

    changeHandler = (event) => {
        this.setState(prevState => ({ showAll: !prevState.showAll }));
        
    }
}


export default ShowTodo;