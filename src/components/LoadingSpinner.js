import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = () => (
  <div className="LoadingSpinner" role="alert" aria-busy="true">
    <img src="/images/spinner.svg" alt="Loading" />
  </div>
);

export default LoadingSpinner;
