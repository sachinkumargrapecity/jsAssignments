

function reducer(state: Object = {}, action: any): any {
    
    let apiWebsite = 'https://api.github.com';
    switch (action.type) {

        case 'fetchInitial': {
            
           return { currentList: action.currentList, currentPage: action.currentPage, totalPage: action.totalPage}
        }
        default: {
            return state;
        }
    }
}

function returnDataFromFetch(url: string): any {

    return fetch(url).then((response: any) => response.json()).then((json) => { return json; });
}

function totalPage(totalResults: number, perPageResults: number): number {
    let remainingResults: number = totalResults % perPageResults;

    if (remainingResults > 0) return (totalResults / perPageResults) + 1;
    else return (totalResults / perPageResults);
}

export default reducer;