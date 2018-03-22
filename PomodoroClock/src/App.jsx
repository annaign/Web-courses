import React from 'react';
import Pomodoro from './containers/Pomodoro';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <div className="container">
          <a className="headerLink"
            target="_blank"
            rel="noopener noreferrer"
            href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
          >
            <h1>Pomodoro Clock</h1>
          </a>

          <Pomodoro />

          <div className="clearFooter" />
        </div>

        <footer>Copyright &copy; 2018</footer>
      </React.Fragment>
    );
  }
}
