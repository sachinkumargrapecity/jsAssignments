import React, { Component } from 'react';
import './AddToDo.css';
let startCount = 0;

const generateId = () => {
    return startCount++;
}

class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: ''
        }
    }

    onSubmitAction = (event) => {
        this.props.storage.dispatch({ type: 'add', todo: { title: this.state.todo, id: generateId() } });
        event.preventDefault();
    }

    onChangeHandler = (event) => {
        this.setState({ todo: event.target.value });
    }

    render() {
        return (
            <div id="AddTodoForm">
                <form onSubmit={this.onSubmitAction} id="AddToDo">
                    <input type="text" value={this.state.todo} onChange={this.onChangeHandler}></input>
                    <button type="submit">Add Todo</button>
                </form>
            </div>
        );
    }
}



export default AddTodo;