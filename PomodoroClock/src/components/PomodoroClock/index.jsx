import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export function PomodoroClock(props) {
  const { type, minutes, seconds } = props;

  return (
    <div className={`pomodoroTime ${type}`}>
      <div className="minutes">{minutes}</div>
      <div className="seconds">{seconds}</div>
    </div>
  );
}

PomodoroClock.propTypes = {
  type: PropTypes.string.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired
};
