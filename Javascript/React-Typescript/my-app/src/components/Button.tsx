import React,{Component} from 'react';

interface buttonProps{
    innerText:string,
    className: string,
    type:string,
    clickHandler(event:any):any
}

class Button extends Component<buttonProps>{
    constructor(props:buttonProps){
        super(props);
    }

    render(){
        return <button className={this.props.className} onClick={this.props.clickHandler}>{this.props.innerText}</button>
    }

}

export default Button;