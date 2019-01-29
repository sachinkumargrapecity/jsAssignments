import React, { Component } from 'react';
import '../css/singleIssue.css';

interface singleIssueProps {
    title: string,
    link: string,
    RestInfo: object,
    onClickHandler(event: any): any
}
class SingleIssueFormat extends Component<singleIssueProps, any>{
    render() {
        return <div className="container-fluid">
            <div className="row">
                <div className="col textLeft">
                    <div className="list-group">

                        <div className="list-group-item list-group-item-warning"><a href={this.props.link} target="_blank" rel="nofollow" className="link">
                            <h5> <svg className="octicon octicon-issue-opened open" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"></path></svg>
                                {this.props.title}</h5>
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default SingleIssueFormat;