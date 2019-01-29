import React, {Component} from 'react';
import './InformationShow.css';
class InformationShow extends Component{
constructor(props){
    super(props);
    this.state = {
        name: this.props.booksStorage.getState().books[0].name,
        author:this.props.booksStorage.getState().books[0].author,
        date: this.props.booksStorage.getState().books[0].date
    }
}
    render(){
        this.props.booksStorage.subscribe(this.updateBookInformation);
        return (<div id="information">
            <span>{this.state.name}</span><br/>
            <span>{this.state.author}</span><br/>
            <span>{this.state.date}</span><br/>
        </div>);
    }

    updateBookInformation=()=>{
        let currentBookIndex = this.props.booksStorage.getState().currentBook;
        this.setState(()=>
        {   
            return {
                name: this.props.booksStorage.getState().books[currentBookIndex].name,
                author:this.props.booksStorage.getState().books[currentBookIndex].author,
                date: this.props.booksStorage.getState().books[currentBookIndex].date
            };
        }   
        );

    }

    currentBookData(){

    }
}

export default InformationShow;