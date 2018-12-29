import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import './SearchInput.scss';

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value
    }
    // debounce the passed in dispatch method
    this.changed = debounce(this.props.onChange, 250);
    this.inputRef = React.createRef();
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    onKeydown: PropTypes.func,
    onClick: PropTypes.func
  };

  componentDidUpdate(prevProps) {
    // if got new value from parent, for example when clearing query in a store action -> update input value
    if (this.props.value !== prevProps.value) {
      this.setState({value: this.props.value});
    }
  }

  updateInputValue = (val, shouldFocus) => {
    if (shouldFocus) {
      this.inputRef.current.focus();
    }

    this.setState({
      value: val
    }, () => {
      this.changed(val);
    });
  }

  render() {
    return (
      <div className="SearchInput">
        <input
          ref={this.inputRef}
          type="text"
          value={this.state.value}
          placeholder="Type a movie..."
          aria-label="Search input for movies"
          autoFocus="autoFocus"
          onChange={(e) => this.updateInputValue(e.target.value)}
          onClick={this.props.onClick}
          onKeyDown={this.props.onKeydown}
        />
        {this.state.value && <button aria-label="Clear Input" onClick={() => this.updateInputValue('', true)}>&times;</button>}
      </div>
    );
  }
}

export default SearchInput;
