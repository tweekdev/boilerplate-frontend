import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
  return (
    <div>
      <div className={`${props.asOverlay && 'loading-spinner__overlay'}`}>
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
