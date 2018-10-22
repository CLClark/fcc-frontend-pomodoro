function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import PropTypes from 'prop-types';
//id "pomo-wrap"

/* 

id="break-label"
id="break-length"
id="break-increment"
id="break-decrement"

id="session-label"
id="session-length"
id="session-increment"
id="session-decrement"

id="time-left"
id="beep"
id="start_stop"
id="reset"

*/
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      running: false,
      sessBreak: "session",
      breakLength: 5,
      sessLength: 25
    };
    this.reset = this.reset.bind(this);
    this.switcher = this.switcher.bind(this);
    this.ticker = this.ticker.bind(this);
    this.lengths = this.lengths.bind(this);
  }

  reset() {//set session-length
    //set break-length
    //stop/.load() beep
    //set timer.running = false
    ///set timer session: switch() fn
  }

  lengths(which, what) {
    //which = "break" or "session"
    switch (which) {
      case "break":
        what == "increment" ? this.setState({
          breakLength: this.breakLength + 1
        }) : this.setState({
          breakLength: this.breakLength - 1
        });
        break;

      default:
        //"session"
        what == "increment" ? this.setState({
          sessLength: this.sessLength + 1
        }) : this.setState({
          sessLength: this.sessLength - 1
        });
        break;
    } //what = "increment or "decrement"


    console.log(which + " " + what);
  }

  switcher() {//if "session" > pull session-length prop
    //if "break" > pull break-length prop
  }

  startStop() {
    //sets timer to paused or running
    this.setState({
      running: !this.state.running
    }, () => {
      console.log('running: ' + this.state.running);

      if (this.state.running == true) {
        //start the countdown
        this.ticker("tick");
      } else {
        this.ticker("tock");
      } //stop the countdown

    });
  }

  ticker(tickOrTock) {
    //when this.state.status == "running" > decrement "time-left" by 1 each 1000ms (stop at 00:00)
    switch (tickOrTock) {
      case "tick":
        //start the timer on "time-left"
        break;

      default:
        //stop the timer
        break;
    }
  }

  render() {
    return React.createElement("div", {
      id: "clock-wrap"
    }, React.createElement(Display, {
      timeLeft: "00:00",
      timerLabel: this.state.sessBreak
    }), React.createElement(StartStop, {
      startStop: this.startStop
    }), React.createElement(BreakHandler, {
      lengthControls: this.lengths,
      breakLength: this.state.breakLength
    }), React.createElement(SessionHandler, {
      lengthControls: this.lengths,
      sessionLength: this.state.sessLength
    }), React.createElement(Beep, null));
  }

} //Timer


Timer.propTypes = {}; // // export default Timer;

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement("div", {
      id: "display"
    }, React.createElement("div", {
      id: "timer-label"
    }, this.props.timerLabel), React.createElement("div", {
      id: "time-left"
    }, this.props.timeLeft));
  }

} // export default Display;


class StartStop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return React.createElement("div", {
      id: "start_stop",
      onClick: this.props.startStop
    }, "Start Stop");
  }

} // export default StartStop;


class BreakHandler extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "incrementer", () => {
      this.props.lengthControls("break", "increment");
      return "increment break";
    });

    _defineProperty(this, "decrementer", () => {
      this.props.lengthControls("break", "decrement");
      return "decrement break";
    });
  }

  render() {
    return React.createElement("div", null, React.createElement("div", {
      id: "break-label"
    }, "BREAK"), React.createElement("div", {
      id: "break-length"
    }, this.props.breakLength), React.createElement("div", {
      id: "break-increment",
      onClick: this.incrementer()
    }), React.createElement("div", {
      id: "break-decrement",
      onClick: this.decrementer()
    }));
  }

}

BreakHandler.propTypes = {}; // export default BreakHandler;

class SessionHandler extends React.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "incrementer", () => {
      this.props.lengthControls("session", "increment");
      return "increment session";
    });

    _defineProperty(this, "decrementer", () => {
      this.props.lengthControls("session", "decrement");
      return "decrement session";
    });
  }

  render() {
    return React.createElement("div", null, React.createElement("div", {
      id: "session-label"
    }, "session"), React.createElement("div", {
      id: "session-length"
    }, this.props.sessionLength), React.createElement("div", {
      id: "session-increment",
      onClick: this.incrementer()
    }), React.createElement("div", {
      id: "session-decrement",
      onClick: this.decrementer()
    }));
  }

}

SessionHandler.propTypes = {}; // export default SessionHandler;

class Beep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return React.createElement("audio", {
      id: "beep"
    });
  }

} // export default Beep;
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


const timerElement = document.getElementById("pomo-wrap");
ReactDOM.render(React.createElement(Timer, null), timerElement);
//# sourceMappingURL=index.js.map