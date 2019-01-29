import React, {Component} from 'react';
import './BookList.css';

class Book  extends Component{
    render(){
      let bookNumber = this.props.bookNumber;
      return (<div><button id={this.props.bookInfo.name} onClick={()=> {this.onClickHandler(bookNumber)}}>{this.props.bookInfo.name}</button><br/></div>);
    }
  
    onClickHandler(bookNumber){
     this.props.onClickHandler(bookNumber)
    }
  }
  
  class BookList extends Component{
    render(){
      return this.createList();
    }
    
    createList = () => {
      let allDivs = [];
      for(let i=0;i<this.props.books.length;i++){
      allDivs.push(<Book  onClickHandler = {this.props.onClickHandler} bookInfo={this.props.books[i]} bookNumber = {i}></Book>);
      }
      return allDivs;
    }
  }


  export default BookList;
  