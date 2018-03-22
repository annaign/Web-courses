import React from 'react';
import PomodoroBlock from '../PomodoroBlock';
import { Button } from '../../components';
import './style.css';

export default class Pomodoro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusPomodoro: 'Reset',
      statusRest: 'Reset',
      disabledInputRange: false,
      mute: 'off'
    };
    this.interval = null;
  }

  onClickStart = () => {
    this.setState({
      statusPomodoro: 'Start',
      statusRest: 'Reset',
      disabledInputRange: true
    });
  };

  onSwitch = type => {
    if (type === 'pomodoro') {
      this.setState({
        statusPomodoro: 'Reset',
        statusRest: 'Start',
        disabledInputRange: true
      });
    } else {
      this.setState({
        statusPomodoro: 'Start',
        statusRest: 'Reset',
        disabledInputRange: true
      });
    }
  };

  onClickPause = () => {
    this.setState({
      statusPomodoro: 'Pause',
      statusRest: 'Pause',
      disabledInputRange: false
    });
  };

  onClickReset = () => {
    this.setState({
      statusPomodoro: 'Reset',
      statusRest: 'Reset',
      disabledInputRange: false
    });
  };

  onClickMute = () => {
    if (this.state.mute === 'off') {
      this.setState({ mute: 'on' });
    } else {
      this.setState({ mute: 'off' });
    }
  };

  render() {
    const { statusPomodoro, statusRest, disabledInputRange, mute } = this.state;
    let sound;
    if (mute === 'off') {
      sound = 'on';
    } else {
      sound = 'off';
    }

    const onSwitch = this.onSwitch;

    return (
      <React.Fragment>
        <div className="btnBlock">
          <Button onClick={this.onClickStart}>Start</Button>
          <Button onClick={this.onClickPause}>Pause</Button>
          <Button onClick={this.onClickReset}>Reset</Button>
          <Button onClick={this.onClickMute}>
            <span className={`sound ${sound}`} role="img" aria-label="sound">
              &#128266;
            </span>
            <span className={`sound ${mute}`} role="img" aria-label="mute">
              &#128263;
            </span>
          </Button>
        </div>

        <PomodoroBlock
          type="pomodoro"
          status={statusPomodoro}
          disabledInputRange={disabledInputRange}
          onSwitch={onSwitch}
          mute={mute}
        />
        <PomodoroBlock
          type="rest"
          status={statusRest}
          disabledInputRange={disabledInputRange}
          onSwitch={onSwitch}
          mute={mute}
        />
      </React.Fragment>
    );
  }
}
