import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function Button(props) {
  const { children, onClick } = props;

  return (
    <button type="button" className="btn" onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired
};
