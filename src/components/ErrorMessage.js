import React from 'react';
import PropTypes from 'prop-types';
import './ErrorMessage.scss';

const ErrorMessage = ({error}) => (
  <div className="ErrorMessage" role="alert" aria-busy="true">
    <strong>{error.Error || 'Something went wrong'}</strong>
  </div>
);

ErrorMessage.propTypes = {
  error: PropTypes.object.isRequired
};

export default ErrorMessage;
