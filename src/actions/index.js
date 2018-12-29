export const loadSearchResults = (query) => ({type: 'LOAD_SEARCH_RESULTS', query: query});

export const loadSearchResultsSuccess = (query, result) => ({type: 'LOAD_SEARCH_RESULTS_SUCCESS', query: query, result: result});

export const loadSearchResultsError = (query, error) => ({type: 'LOAD_SEARCH_RESULTS_ERROR', query: query, error: error});

export const emptySearchResult = (query) => ({type: 'EMPTY_SEARCH_RESULT', query: query});

export const openResultList = () => ({type: 'OPEN_RESULTS_LIST'});

export const closeResultList = () => ({type: 'CLOSE_RESULTS_LIST'});

export const setItemInFocus = (increment) => ({type: 'SET_ITEM_IN_FOCUS', increment: increment});

export const addSearchHistory = (item) => ({type: 'ADD_SEARCH_HISTORY', item: item});

export const clearSearchHistory = (query) => ({type: 'CLEAR_SEARCH_HISTORY'});

export const removeSearchHistory = (index) => ({type: 'REMOVE_SEARCH_HISTORY', index: index});

const fetchPosts = query => dispatch => {
  return fetch(`http://www.omdbapi.com/?apiKey=db8f1080&type=movie&s=*${query}*`)
    .then(response => response.json())
    .then(
      json => json.Response === 'True' // api returns string 'True' if success
      ? dispatch(loadSearchResultsSuccess(query, json))
      : dispatch(loadSearchResultsError(query, json)))
    .catch(error => dispatch(loadSearchResultsError(query, error)));
};

const shouldFetchData = (state, query) => {
  // if typed more than 2 letters and not already fetched
  if (query && query.length > 2 && (!state.data || !state.data[query])) {
    return true;
  }
  return false;
};

export const fetchDataIfNeeded = query => (dispatch, getState) => {
  const trimmedQuery = query && query.trim();

  if (trimmedQuery) {
    // start loading spinner
    dispatch(loadSearchResults(trimmedQuery));

    if (shouldFetchData(getState(), trimmedQuery)) {
      // make api request
      dispatch(fetchPosts(trimmedQuery));
    } else {
      // results already cached, update visible result
      dispatch(loadSearchResultsSuccess(query));
    }
  } else {
    // no query
    dispatch(emptySearchResult(trimmedQuery));
  }
};
