import React, { Component } from 'react';
import {Link,BrowserRouter as Router} from 'react-router-dom';
import {changePage} from '../store/actions';

interface pagination{
    lastPage:number,
    currentPage:number,
    totalPaginationLink:string
}

export default class Pagination extends Component<pagination,any>{
    constructor(props:any){
        super(props);
        this.state = {
            lastPage: props.lastPage,
            currentPage:props.currentPage,
            maxPaginationPages: parseInt(props.totalPaginationLink)
        }
    }
    componentWillReceiveProps(newProps:any){
        this.setState({
            lastPage:newProps.lastPage,
            currentPage:newProps.currentPage,
            maxPaginationPages: parseInt(newProps.totalPaginationLink)
        })
    }

    render(){
        return <div className="row">
        <div className="col-sm-7">
        <Router>
        <ul className="pagination justify-content-center">
        

            {
                this.linksOfPagesToShow().map((item,index)=>{
                    if(item!==this.state.currentPage){
                        return <li className="page-item">
                        <Link className="page-link" to={{pathname:"/", search:"?page="+item}}>{item}
                        </Link>
                        </li>
                    }
                    else{
                        return <li className="page-item active" aria-current="page">
                        <span className="page-link">
                          {item}
                          <span className="sr-only">(current)</span>
                        </span>
                      </li>
                    }

                        
                })
            }
            {
                
            }
            </ul>
            </Router>
            </div>
            </div>;
    }

    linksOfPagesToShow():Array<number>{
        let pages = [];
        // check if length is greater than 'maxPaginationPages'
        // if yes show only current-3 to current+4 
        //else show all the pages
        
            // put last 3 pages in array
            let totalPages = 0;
            let currentPage = this.state.currentPage;
            while(currentPage>0 && totalPages<3){
                pages.push(currentPage);
                totalPages++;
                currentPage--;
            }
            // reverse the array
            pages.reverse();
            // push current page if totalPages >= 3
            if(totalPages>=3)
                pages.push(this.state.currentPage);
            // now put next elements until totalpages <8
            currentPage = this.state.currentPage+1;
            while(totalPages<8 && this.state.lastPage>=currentPage){
                pages.push(currentPage);
                currentPage++;
                totalPages++;
            }
             console.log(pages);
            return pages;
        
    }
}

