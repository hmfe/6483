import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './App.scss';
import SearchResultList from '../components/SearchResult/SearchResultList';
import SearchInput from '../components/SearchInput';
import SearchHistoryList from '../components/SearchHistory/SearchHistoryList';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import {
  fetchDataIfNeeded,
  openResultList,
  closeResultList,
  addSearchHistory,
  clearSearchHistory,
  removeSearchHistory,
  setItemInFocus
} from '../actions';

class App extends Component {
  constructor(props) {
    super(props);

    // save search input container ref for detecting outside click
    this.searchContainerRef = React.createRef();
  }

  static propTypes = {
    query: PropTypes.string.isRequired,
    result: PropTypes.array.isRequired,
    focusIndex: PropTypes.number.isRequired,
    resultListOpen: PropTypes.bool.isRequired,
    searchHistory: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {dispatch, query} = this.props;
    dispatch(fetchDataIfNeeded(query));

    // add mousedown listener to be able to close result list when clicking outside it
    document.addEventListener('mousedown', this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClick, false);
  }

  handleClick = (e) => {
    // if did not click on result list -> close it
    if (!this.searchContainerRef.current.contains(e.target)) {
      this.props.dispatch(closeResultList());
    }
  }

  handleInputChange = (query) => {
    this.props.dispatch(fetchDataIfNeeded(query))
  }

  handleInputKeydown = (e) => {
    // don't do anything if we don't show any results
    if (!this.props.result.length) {
      return;
    }

    const key = e.which;

    // clicked esc -> return and close result list
    if (key === 27) {
      return this.props.dispatch(closeResultList());
    }

    // make sure result list is open
    this.props.dispatch(openResultList());

    // clicked enter -> add to search history
    if (key === 13) {
      return this.props.dispatch(addSearchHistory());
    }

    // clicked up or down arrows -> update focused item
    const increment = key === 38 ? -1 : (key === 40 ? 1 : 0);

    if (increment) {
      this.props.dispatch(setItemInFocus(increment));
    }
  }

  render() {
    const {
      query,
      result,
      searchHistory,
      focusIndex,
      resultListOpen,
      isLoading,
      error,
      dispatch
    } = this.props;

    return (
      <div className="App">
        <div className="container search-input-container">
          <h1>Search for movies</h1>
          <div ref={this.searchContainerRef}>
            <SearchInput
              value={query}
              onChange={this.handleInputChange}
              onClick={() => dispatch(openResultList())}
              onKeydown={this.handleInputKeydown}
            />
            <div aria-live="polite">
              {
                isLoading ? <LoadingSpinner /> :
                error ? <ErrorMessage error={error} /> :
                (<SearchResultList
                  result={result}
                  query={query}
                  focusIndex={focusIndex}
                  resultListOpen={resultListOpen}
                  onClickResultItem={(item) => dispatch(addSearchHistory(item))}
                />)
              }
            </div>
          </div>
        </div>
        <div className="container search-history-container">
          <SearchHistoryList
            items={searchHistory}
            onDeleteAllClick={() => (
              window.confirm('Are you sure you want to delete all saved movies?') && dispatch(clearSearchHistory())
            )}
            onDeleteQueryClick={(deleteIndex, deleteTitle) => (
              window.confirm(`Are you sure you want to delete ${deleteTitle}?`) && dispatch(removeSearchHistory(deleteIndex))
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const {
    query,
    data,
    focusIndex,
    resultListOpen,
    searchHistory,
    error,
    isLoading
  } = state;
  const result = (data && data[query]) || [];

  return {
    query,
    result,
    focusIndex,
    resultListOpen,
    searchHistory,
    error,
    isLoading
  };
};

export default connect(mapStateToProps)(App);
