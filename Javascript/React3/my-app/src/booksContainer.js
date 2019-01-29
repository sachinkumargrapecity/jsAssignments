import React, {Component} from 'react';
import {createStore} from 'redux';
import BookList from './bookList';
import InformationShow from './InformationShow';
import './container.css';
class BooksContainer extends Component{

    fetchData = () =>{
        return {
            currentBook : 0,
            books: [
            {
              name: 'On The Hill',
              author : 'Shri',
              date : 'Dec. 2010'
            },
            {
              name: 'Sky',
              author : 'Hari',
              date : 'Oct. 2010'
            },
            {
              name: 'Earth',
              author : 'Premchand',
              date : 'Jan. 2000'
            }
          ]
        };
    }

    reducerForDataStore = (state = this.fetchData(),action) =>{
        if(action.type === 'changeCurrentBook'){
                return Object.assign({},state,{currentBook:action.bookIndex});
        }
        return state;
    }

    

    render(){
        let storage = createStore(this.reducerForDataStore);
        return <div id="container">
                <BookList booksStorage={storage}></BookList>
                <InformationShow booksStorage={storage}></InformationShow>
        </div>;
    }


}

export default BooksContainer;