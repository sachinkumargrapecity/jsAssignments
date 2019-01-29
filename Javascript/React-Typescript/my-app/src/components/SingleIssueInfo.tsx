import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../css/singleIssueInfo.css';

interface SingleIssueInfoProps {
    exist: string,
    data: any,
    number: string
}

class SingleIssueInfo extends Component<SingleIssueInfoProps>{
    render() {
        if (this.props.exist === 'yes') {
            return (
                <div className="d-flex justify-content-center">
                    <div className="jumbotron col-sm-10 mt-1">
                        <div className="row mt-1">
                            <div className="col-sm-8">
                                <div className="card bg-light h4 font-weight-bold border border-dark">
                                    <div className="card-body">
                                        <ReactMarkdown escapeHtml={false} source={`<span>&nbsp
${this.props.data.issueTitle}
</span>                                   
<span class="text-muted">
      #${this.props.number}
</span>`}></ReactMarkdown>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mt-1">
                            <div className="col-sm-8">
                                <div className="card">
                                    <div className="card-body border border-dark rounded">
                                        <div className="card-header border border-dark rounded">
                                            {`${this.props.data.user.login} commented`}
                                        </div>
                                        <div className="card-text">
                                            <ReactMarkdown escapeHtml={false} source={this.props.data.body}></ReactMarkdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {this.props.data.comments.map((item: any, index: number) => {
                            return <div className="row mt-1">
                                <div className="col-sm-8">
                                    <div className="card">
                                        <div className="card-body border border-dark rounded">
                                            <div className="card-header border border-dark rounded">
                                                {item.user.login + 'commented'}
                                            </div>
                                            <div className="card-text">
                                                <ReactMarkdown source={item.body}></ReactMarkdown>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })

                        }
                    </div>
                </div>
            );
        }
        else {
            return (
                <div className="container mt-5">
                    <div className="card">
                        <div className="card-header bg-warning">
                            Comment Data Not Found!!!
                            <Link to='/'><button className="btn btn-primary"> Search Issues</button></Link>

                        </div>
                    </div>
                </div>
            )

        }
    }

}

const mapStateToProps = (newState: any) => {
    let params = new URLSearchParams(location.search);
    let str: any = params.get('issueNumber');
    let keyNum: any = parseInt(str);
    if (isNaN(keyNum) || !newState[keyNum]) return { exist: 'no', data: '', number: '' }
    return { data: newState[keyNum], exist: 'yes', number: keyNum };
}

export default connect(mapStateToProps)(SingleIssueInfo);