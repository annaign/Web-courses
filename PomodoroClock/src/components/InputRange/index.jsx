import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function InputRange(props) {
  const { disabled, duration, min, max, onChange } = props;

  return (
    <div className="inputRangeWrap">
      <div className={`inputRange inputRange${disabled}`}>
        <input
          type="range"
          value={duration}
          min={min}
          max={max}
          step={1}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {/* <p>{`${duration}`}</p> */}
    </div>
  );
}

InputRange.propTypes = {
  disabled: PropTypes.bool.isRequired,
  duration: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};
