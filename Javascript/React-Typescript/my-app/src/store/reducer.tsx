

function reducer(state: any = {}, action: any): any {

    let apiWebsite = 'https://api.github.com';
    switch (action.type) {

        case 'fetchInitial': {

            return { currentList: action.currentList, currentPage: 1, totalPage: action.totalPage, user: action.user, repo: action.repo }
        }
        case 'fetchSingleIssueInfo':{
            return Object.assign({}, state, {[action.issueNumber]:{user:action.user,issueTitle:action.issueTitle,body:action.issueBody,comments:action.issueComments}});
        }
        case 'changePage': {

            return Object.assign({}, state, { currentList: action.currentList, currentPage: action.currentPage });
        }
        default: {
            return state;
        }
    }
}


export default reducer;