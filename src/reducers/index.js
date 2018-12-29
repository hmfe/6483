export default(state = {
  query: '',
  data: {},
  resultListOpen: false,
  focusIndex: 0,
  searchHistory: [],
  isLoading: false,
  error: null
}, action) => {
  switch (action.type) {
    case 'LOAD_SEARCH_RESULTS':
      return {
        ...state,
        error: null,
        query: action.query,
        isLoading: true
      };
    case 'LOAD_SEARCH_RESULTS_SUCCESS':
      const results = {
        ...state.data
      };

      // store max 10 search results so we don't use too much of the browser cache
      const resultKeys = Object.keys(results);
      if (resultKeys.length >= 10) {
        delete results[resultKeys[0]];
      }

      return {
        ...state,
        resultListOpen: true,
        data: action.result
          ? {
            ...results,
            [action.query]: action.result.Search
          }
          : results,
        error: null,
        isLoading: false
      };
    case 'LOAD_SEARCH_RESULTS_ERROR':
      return {
        ...state,
        error: action.error,
        isLoading: false
      };
    case 'EMPTY_SEARCH_RESULT':
      return {
        ...state,
        query: '',
        error: null,
        isLoading: false
      };
    case 'OPEN_RESULTS_LIST':
      return {
        ...state,
        resultListOpen: true
      }
    case 'CLOSE_RESULTS_LIST':
      return {
        ...state,
        resultListOpen: false
      }
    case 'SET_ITEM_IN_FOCUS':
      const focusIndex = state.focusIndex + action.increment;
      const itemCount = state.data[state.query].length - 1;
      return {
        ...state,
        focusIndex: focusIndex > itemCount
          ? 0
          : focusIndex < 0
            ? itemCount
            : focusIndex
      }
    case 'ADD_SEARCH_HISTORY':
      // get item from action if available, otherwise from cached data by query and focus index
      const item = action.item || state.data[state.query][state.focusIndex];
      item.timestampSaved = new Date();

      return {
        ...state,
        searchHistory: [
          ...state.searchHistory,
          item
        ],
        query: '', // reset input on selection
        focusIndex: 0,
        resultListOpen: false
      };
    case 'REMOVE_SEARCH_HISTORY':
      return {
        ...state,
        searchHistory: state.searchHistory.filter((item, index) => index !== action.index)
      };
    case 'CLEAR_SEARCH_HISTORY':
      return {
        ...state,
        searchHistory: []
      }
    default:
      return state;
  }
};
