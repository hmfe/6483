import React from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';
import './SearchResultList.scss';

const SearchResultList = ({result, query, focusIndex, resultListOpen, onClickResultItem}) => (
  <ul className={'SearchResultList' + (!resultListOpen ? ' hidden' : '')}>
    {result.map((r, i) =>
      <SearchResult
        key={r.imdbID}
        inFocus={focusIndex === i}
        item={r}
        query={query}
        onClickItem={onClickResultItem}
      />
    )}
  </ul>
);

SearchResultList.propTypes = {
  result: PropTypes.array.isRequired,
  query: PropTypes.string.isRequired,
  onClickResultItem: PropTypes.func.isRequired,
  resultListOpen: PropTypes.bool.isRequired,
  focusIndex: PropTypes.number.isRequired
};

export default SearchResultList;
