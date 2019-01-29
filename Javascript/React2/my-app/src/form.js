import React, {Component} from 'react';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {  inputName : '',
                        inputClass : ''};
    }

    onSubmitHandler = (event) => {
        alert(this.state.inputName + this.state.inputClass);
        event.preventDefault();
    }

    changeHandler = (event) =>{
        // we are using computed key name here.. it is a es6 feature
        // event.target.name -- contains the name of the input that was given
        // keep it same as in state key
        this.setState({[event.target.name] : event.target.value});
    }

    render(){
        return(
            <form onSubmit = {this.onSubmitHandler}>
            <label style={"color:" + this.state.color}>Input the data in form</label>
                <input name='inputName' value={this.state.inputName} onChange = {this.changeHandler} placeholder="Name"></input><br/>
                <input name='inputClass' value={this.state.inputClass} onChange = {this.changeHandler} placeholder="Class"></input><br/>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default Form;