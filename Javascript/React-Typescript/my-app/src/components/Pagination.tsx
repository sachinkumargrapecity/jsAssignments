import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { changePage } from '../store/actions';
import { connect } from 'react-redux';

interface pagination {
    lastPage: number,
    currentPage: number,
    totalPaginationLink: string,
    user: string,
    repo: string,
}

class Pagination extends Component<pagination & RouteComponentProps<any>, any>{
    constructor(props: any) {
        super(props);
        this.state = {
            lastPage: props.lastPage,
            currentPage: props.currentPage,
            maxPaginationPages: parseInt(props.totalPaginationLink)
        }
    }
    componentWillReceiveProps(newProps: any) {
        this.setState({
            lastPage: newProps.lastPage,
            currentPage: newProps.currentPage,
            maxPaginationPages: parseInt(newProps.totalPaginationLink)
        })
    }

    render() {

        return <div className="row">
            <div className="col-sm-7">

                <ul className="pagination justify-content-center">
                    {
                        this.linksOfPagesToShow().map((item, index) => {
                            if (item !== this.state.currentPage) {
                                return <li className="page-item" key={index}>
                                    <Link onClick={() => { this.callUpdatePage(item) }} className="page-link" to={{ pathname: "/", search: "?page=" + item }}>{item}
                                    </Link>
                                </li>
                            }
                            else {
                                return <li className="page-item active" aria-current="page" key={index}>
                                    <span className="page-link">
                                        {item}
                                        <span className="sr-only">(current)</span>
                                    </span>
                                </li>
                            }


                        })
                    }

                </ul>
            </div>
        </div>;
    }

    callUpdatePage = (pageNumber: number) => {

        if (pageNumber !== this.state.currentPage) {
            this.setState({ currentPage: pageNumber }, () => {
                changePage({ page: pageNumber, type: 'changePage', user: this.props.user, repo: this.props.repo });
            });

        }
    }

    linksOfPagesToShow(): Array<number> {
        let pages = [];
        // check if length is greater than 'maxPaginationPages'
        // if yes show only current-3 to current+4 
        //else show all the pages

        // put last 3 pages in array
        let totalPages = 0;
        let currentPage = this.state.currentPage;
        while (currentPage > 0 && totalPages <= 3) {
            pages.push(currentPage);
            totalPages++;
            currentPage--;
        }
        // reverse the array
        pages.reverse();

        // now put next elements until totalpages < 8
        currentPage = Number(this.state.currentPage) + 1;
        while (totalPages < 8 && this.state.lastPage >= currentPage) {
            pages.push(currentPage);
            currentPage++;
            totalPages++;
        }
        return pages;

    }
}

const mapStateToProps = (newState: any): any => {
    return {
        currentPage: newState.currentPage
    }
}


export default connect(mapStateToProps, { changePage })(Pagination);
