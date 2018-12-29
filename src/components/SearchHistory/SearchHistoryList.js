import React from 'react';
import PropTypes from 'prop-types';
import SearchHistory from './SearchHistory';
import './SearchHistoryList.scss';

const SearchHistoryList = ({items, onDeleteAllClick, onDeleteQueryClick}) => (
  <div className="SearchHistoryList">
    <div className="header">
      <h1>Saved movies</h1>
      {items.length > 0 && <button aria-label="Delete all saved movies" onClick={() => onDeleteAllClick()}>Delete all &times;</button>}
    </div>
    {items.length ? (
      <table>
        <tbody>
          {items.map((q, i) => (<SearchHistory key={i} index={i} item={q} onDeleteClick={onDeleteQueryClick}/>))}
        </tbody>
      </table>
    ) : 'No movies saved yet.'}
  </div>
);

SearchHistoryList.propTypes = {
  items: PropTypes.array.isRequired,
  onDeleteAllClick: PropTypes.func.isRequired,
  onDeleteQueryClick: PropTypes.func.isRequired
};

export default SearchHistoryList;
