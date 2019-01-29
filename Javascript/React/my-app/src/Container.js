import React,{Component} from 'react';
import BookList from './BookList';
import Infromation from './Information.js';
import './Container.css';
class Container extends Component{
  constructor(props){
    super(props);
    this.state = {
      bookInfoToShow: 0,
      books:  [
        {
          name: 'On The Hill',
          Author : 'Shri',
          Date : 'Dec. 2010'
        },
        {
          name: 'Sky',
          Author : 'Hari',
          Date : 'Oct. 2010'
        },
        {
          name: 'Earth',
          Author : 'Premchand',
          Date : 'Jan. 2000'
        }
      ]
    }
  }

  onClickHandler = (bookNumber) =>{
    this.setState((old,props)=>({bookInfoToShow: bookNumber}));
  }

  render(){
    return(
      <div id="container">
      <div id="BookList"><BookList books = {this.state.books} onClickHandler={this.onClickHandler}></BookList></div>
      <div id="information"><Infromation bookInfo = {this.state.books[this.state.bookInfoToShow]}></Infromation></div>
      </div>
    );
  }
}

export default Container;