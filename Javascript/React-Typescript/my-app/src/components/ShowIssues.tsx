import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInitial} from '../store/actions';
import { Form, SingleIssueFormat, Pagination } from './';
import { parse } from 'url';


interface gitHubData {
    data: Object,
    currentPage: number,
    totalPage: number,
    user: string,
    repo: string
}

class ShowIssues extends Component<gitHubData & any, any>{
    constructor(props: gitHubData & any) {
        super(props);
        this.state = {
            currentPage: this.props.currentPage,
            totalPage: this.props.totalPage,
            data: this.props.data
        }
    }

    componentWillReceiveProps(nextprops: any) {

        if (this.props.currentPage !== nextprops.currentPage) {
            this.setState({
                currentPage: nextprops.currentPage,
                totalPage: nextprops.totalPage,
                data: nextprops.data
            });
        }
    }

    render() {
        if (!this.state.data) {
            return <Form inputs={[{ onSubmittion: this.onFormSubmit, onChanges: this.onChangeInput }]}></Form>
        }

        return <div id="ShowIssues">
            <Form inputs={[{ onSubmittion: this.onFormSubmit, onChanges: this.onChangeInput }]}></Form>

            {
                this.state.data.map((item: any, index: number) => {

                    return <div className="container mt" key={index}>
                        <div className="d-flex justify-content-center">
                            <div className="col-sm-10">
                                <SingleIssueFormat key={index} title={item.title} link={item.html_url} RestInfo={item} user={this.props.user} repo={this.props.repo}></SingleIssueFormat>
                            </div>
                        </div>
                    </div>
                })
            }

            <div className="container " >
                <div className="row justify-content-center bg-gradient-secondary">
                    <div className="col-sm-10 ">
                        <Pagination history={this.props.history} location={this.props.location} match={this.props.match} lastPage={this.state.totalPage} currentPage={this.state.currentPage} totalPaginationLink='8' user={this.props.user} repo={this.props.repo}></Pagination>
                    </div>
                </div>
            </div>
        </div>;

    }





    onFormSubmit = (event: any) => {
        // validate url
        if (/[a-z]+\:\/\/github\.com\/[a-z0-9A-Z]+\/[a-z0-9A-Z]+/.test(this.state.searchTerm)) {
            // check if user and repo name available in url
            let infoChecked = this.checkUserAndRepo();
            if (infoChecked.exist) {
                fetchInitial({ type: 'fetchInitial', user: infoChecked.user, repo: infoChecked.repo });
            }
        }
        else {
            alert("Not a valid url");
        }
        event.preventDefault();
    }

    checkUserAndRepo = (): any => {
        let url = parse(this.state.searchTerm).pathname;
        let splitted = url!.split('/');
        if (splitted.length >= 3) {
            return {
                user: splitted[1],
                repo: splitted[2],
                exist: true
            };
        }

        return {
            exist: false
        }
    }

    onChangeInput = (event: any) => {
        this.setState({ searchTerm: event.target.value });
    }
}// class closed

const mapStateToProps = (newState: any): gitHubData & any => {

    return {
        currentPage: newState.currentPage,
        totalPage: newState.totalPage,
        data: newState.currentList,
        user: newState.user,
        repo: newState.repo
    };
}

export default connect(mapStateToProps, { fetchInitial })(ShowIssues);

