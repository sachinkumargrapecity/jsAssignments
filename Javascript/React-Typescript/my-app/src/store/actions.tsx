import { store } from '../store/createStore';


const apiWebsite = 'https://api.github.com';

const changePage = (action: any) => {
    let pageUrl = `${apiWebsite}/repos/${action.user}/${action.repo}/issues?page=${action.page}&filter=all`;
    returnDataFromFetch(pageUrl)
        .then((response: any) => {

            store.dispatch({ type: 'changePage', currentPage: action.page, currentList: response });
        })

}


const fetchSingleIssueInfo = (action: any) => {
    let singleIssueUrl = `${apiWebsite}/repos/${action.user}/${action.repo}/issues/${action.issueNumber}/comments`;;
    returnDataFromFetch(singleIssueUrl)
        .then((response: any) => {

            store.dispatch({ user:action.userInfo,issueTitle:action.issueTitle,type: action.type, issueComments: response,issueBody:action.issueBody, issueNumber: action.issueNumber });
        })

}

const fetchInitial = (action: any) => {
    let totalIssuesUrl = `${apiWebsite}/search/issues?q=repo:${action.user}/${action.repo}+type:issue+state:open`;
    returnDataFromFetch(totalIssuesUrl)
        .then((resp: any) => {
            let total_pages = totalPage(resp.total_count, 30);
            // call the github api and fetch the first page data and return new state
            let firstPageUrl = `${apiWebsite}/repos/${action.user}/${action.repo}/issues?page=1&filter=open`;

            returnDataFromFetch(firstPageUrl)
                .then((response: any) => {
                    store.dispatch({ type: 'fetchInitial', currentList: response, currentPage: 1, totalPage: total_pages, user: action.user, repo: action.repo });
                })

        });



}


function returnDataFromFetch(url: string): any {

    return fetch(url).then((response: any) => response.json()).then((json) => { return json; });
}

function totalPage(totalResults: number, perPageResults: number): number {
    let remainingResults: number = totalResults % perPageResults;

    if (remainingResults > 0) return Math.trunc(totalResults / perPageResults) + 1;
    else return (totalResults / perPageResults);
}

export { changePage, fetchInitial, fetchSingleIssueInfo };