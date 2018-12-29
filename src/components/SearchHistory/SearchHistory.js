import React from 'react';
import PropTypes from 'prop-types';
import './SearchHistory.scss';

const SearchHistory = ({item, index, onDeleteClick}) => (
  <tr className="SearchHistory">
    <td className="title">
      {item.Title}
    </td>
    <td className="timestamp">
      {item.timestampSaved.toLocaleString()}
    </td>
    <td className="delete-btn">
      <button aria-label={`Delete ${item.Title} from saved movies`} onClick={() => onDeleteClick(index, item.Title)}>&times;</button>
    </td>
  </tr>
);

SearchHistory.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default SearchHistory;
