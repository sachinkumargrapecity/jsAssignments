import { store } from '../store/createStore';


const apiWebsite = 'https://api.github.com';

const changePage = (actions: any) => {

}

const fetchInitial = (action: any) => {
    let totalIssuesUrl = `${apiWebsite}/search/issues?q=repo:${action.user}/${action.repo}+type:issue:state:all`;
    returnDataFromFetch(totalIssuesUrl)
        .then((resp: any) => {
            let total_pages = totalPage(resp.total_count, 30);
            // call the github api and fetch the first page data and return new state
            let firstPageUrl = `${apiWebsite}/repos/${action.user}/${action.repo}/issues?page=1&filter=all`;

            returnDataFromFetch(firstPageUrl)
                .then((response: any) => {
                    store.dispatch({ type: 'fetchInitial', currentList: response, currentPage: 1, totalPage: total_pages });
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

export { changePage, fetchInitial };