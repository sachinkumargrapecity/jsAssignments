import React, {Component} from 'react';
import './bookList.css';
class Book extends Component{
    render(){
        return <span><button id="bookTitle" onClick={()=>this.changeState(this.props.index)}>{this.props.bookName}</button><br/></span>
    }

    changeState(currentIndex){
            this.props.storage.dispatch({type:'changeCurrentBook', bookIndex: this.props.index});
    }
}

class BookList extends Component{
        render(){
            return <div id="bookList">
                {this.createList()}
            </div>
        }

        createList = () =>{
            let toReturn  = [];
            let currentState = this.props.booksStorage.getState();
            for(let i=0;i<currentState.books.length;i++){
                toReturn.push(<Book key={i} bookName={currentState.books[i].name} index={i} storage={this.props.booksStorage}>{currentState.books[i].name}</Book>);
            }
            return toReturn;
        }
}

export default BookList;