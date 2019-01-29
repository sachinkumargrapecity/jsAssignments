import React, {Component} from 'react';
import './information.css';

class Information extends Component{

  constructor(props){
    super(props);
    this.state = {bookInfo: this.props.bookInfo};
  }

  componentWillReceiveProps(nextprops){
    if(nextprops.bookInfo !== this.props.bookInfo){
    this.setState((old,props) => ({bookInfo:nextprops.bookInfo}));
  }
}

   render(){
      return (<div >
        <span id="subject">Book Name :</span><span>{this.state.bookInfo.name}</span><br/>
        <span id="subject">Author :</span><span>{this.state.bookInfo.Author}</span><br/>
        <span id="subject">Date Published :</span><span>{this.state.bookInfo.Date}</span><br/>
      </div>);
   }
}

export default Information;