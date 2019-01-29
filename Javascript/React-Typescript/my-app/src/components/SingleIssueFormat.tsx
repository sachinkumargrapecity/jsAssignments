import React, { Component } from 'react';
import '../css/singleIssue.css';
import { fetchSingleIssueInfo } from '../store/actions';
import { Link } from 'react-router-dom';

interface singleIssueProps {
    title: string,
    link: string,
    RestInfo: any,
    user: string,
    repo: string
}
class SingleIssueFormat extends Component<singleIssueProps, any>{
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col textLeft">
                    <div className="list-group">

                        <div className="list-group-item list-group-item-light">
                            <Link to= {{pathname:'/issueInfo', search:'?issueNumber=' + this.props.RestInfo.number}} className="black" onClick={() => this.showSingleIssueInfo(this.props.RestInfo.number)}>
                                <span className="lead black"> <svg className="octicon octicon-issue-opened open" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                                    {this.props.title}</span><br />
                                <small className="text-muted">"{this.props.RestInfo.number}" {this.getTime(this.props.RestInfo)}</small>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    showSingleIssueInfo = (issueNumber: string) => {
        fetchSingleIssueInfo({
            type: 'fetchSingleIssueInfo',
            issueNumber: this.props.RestInfo.number,
            repo: this.props.user,
            user: this.props.repo,
            issueBody: this.props.RestInfo.body,
            issueTitle: this.props.title,
            userInfo: this.props.RestInfo.user
        });
    }

    getTime = (info: any): any => {
        let milliSeconds = (new Date()).getTime() - new Date(info.created_at).getTime();
        let hours = Math.trunc(milliSeconds / (1000 * 3600));
        if (hours < 24) return `Opened ${hours} hours ago by ${info.user.login}`;
        let days = Math.trunc(hours / 24);
        if (days <= 31) return `Opened ${days} days ago by ${info.user.login}`;
        return "";
    }
}

export default SingleIssueFormat;