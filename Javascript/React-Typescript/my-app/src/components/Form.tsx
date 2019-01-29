import React, { Component } from 'react';
import { Button } from './';

interface formProps{
    inputs:any
}
// question : how to specity array of objects in interface
export default class Form extends Component<formProps,any>{

    render(){
        return <div className="navbar navbar-dark bg-primary nav-tabs justify-content-center ">
        <div className="nav-item">
            <form className="form-inline my-2 my-lg-0" onSubmit={this.props.inputs[0].onSubmittion}>
           
                <input placeholder="Enter Repository URL" type="text" onChange={this.props.inputs[0].onChanges}></input>
                <Button type="Submit" innerText="Search" className="btn btn-success" clickHandler={() => { }}></Button>
            </form>
        </div>
    </div>;
    }
}


