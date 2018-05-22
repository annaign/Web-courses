import React from 'react';
import PropTypes from 'prop-types';
import { PomodoroClock, InputRange } from '../../components';
import {
  pomodoroMin,
  pomodoroMax,
  restMin,
  restMax,
  pomodoroDuration,
  restDuration
} from '../../constants';
import './style.css';
import ring from '../../audio/sound.mp3';

export default class PomodoroBlock extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      min: this.props.type === 'pomodoro' ? pomodoroMin : restMin,
      max: this.props.type === 'pomodoro' ? pomodoroMax : restMax,
      duration:
        this.props.type === 'pomodoro' ? pomodoroDuration : restDuration,
      durationSeconds: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status === 'Start') {
      //play sound onClick
      if (this.props.mute === 'off') {
        this.playSound();
      }

      this.onStart();
    } else if (nextProps.status === 'Pause') {
      //play sound onClick
      if (this.props.mute === 'off') {
        this.playSound();
      }

      this.onPause();
    } else if (nextProps.status === 'Reset') {
      //play sound onClick
      if (this.props.mute === 'off') {
        this.playSound();
      }

      this.onReset();
    }
  }

  componentWillUnmount() {
    this.onReset();
  }

  onChangeHandle = e => {
    const newDuration = parseInt(e.target.value, 10);
    this.setState({ duration: newDuration, durationSeconds: newDuration * 60 });
  };

  onStart = () => {
    if (this.props.status !== 'Start') {
      let durationSeconds;
      if (this.state.durationSeconds > 0) {
        durationSeconds = this.state.durationSeconds;
      } else {
        durationSeconds = this.state.duration * 60;
      }

      this.setState({ durationSeconds }, () => {
        this.interval = setInterval(() => {
          this.timer();
        }, 1000);
      });
    }
  };

  onPause = () => {
    clearInterval(this.interval);
  };

  onReset = () => {
    clearInterval(this.interval);
    this.setState({
      durationSeconds: 0
    });
  };

  timer = () => {
    const time = this.state.durationSeconds - 1;
    if (time >= 0) {
      this.setState({ durationSeconds: time });
    } else {
      this.onReset();
      if (this.props.mute === 'off') {
        this.playSound();
      }
      this.props.onSwitch(this.props.type);
    }
  };

  playSound() {
    let audio = new Audio(ring);
    audio.play();
  }

  render() {
    const { type, disabledInputRange } = this.props;
    const { min, max, duration, durationSeconds } = this.state;
    let minutes, seconds;

    if (durationSeconds > 0) {
      minutes = parseInt(durationSeconds / 60, 10);
      seconds = durationSeconds - 60 * minutes;
    } else {
      minutes = duration;
      seconds = 0;
    }

    return (
      <div className="pomodoroBlock">
        <PomodoroClock type={type} minutes={minutes} seconds={seconds} />
        <div className="pomodoroManage">
          <InputRange
            disabled={disabledInputRange}
            duration={duration}
            min={min}
            max={max}
            onChange={this.onChangeHandle}
          />
        </div>

        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}

PomodoroBlock.propTypes = {
  type: PropTypes.oneOf(['pomodoro', 'rest']).isRequired,
  status: PropTypes.oneOf(['Start', 'Pause', 'Reset']).isRequired,
  disabledInputRange: PropTypes.bool.isRequired,
  onSwitch: PropTypes.func.isRequired,
  mute: PropTypes.oneOf(['on', 'off']).isRequired
};
