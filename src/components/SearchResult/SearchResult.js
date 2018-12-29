import React from 'react';
import PropTypes from 'prop-types';
import reactStringReplace from 'react-string-replace';
import './SearchResult.scss';

const SearchResult = ({item, query, inFocus, onClickItem}) => (
  <li className={'SearchResult' + (inFocus ? ' focused' : '')}>
    <button aria-label={`Add ${item.Title} to search history`} onClick={() => onClickItem(item)}>
      {reactStringReplace(item.Title, query, (match, i) => <strong key={i}>{match}</strong>) /* highlight match in movie title */}
      {` (${item.Year})`}
    </button>
  </li>
);

SearchResult.propTypes = {
  item: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  inFocus: PropTypes.bool.isRequired,
  onClickItem: PropTypes.func.isRequired
};

export default SearchResult;
