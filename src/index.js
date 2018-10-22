import PropTypes from 'prop-types';

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
			status: "paused",
			sessBreak: "session",
			breakLength: 5,
			sessLength: 25
		}
		this.reset = this.reset.bind(this);
		this.switcher = this.switcher.bind(this);
		this.ticker = this.ticker.bind(this);
	}
	reset(){
		//set session-length
		//set break-length
		//stop/.load() beep
		//set timer.status = paused
		///set timer session: switch() fn
	}
	switcher () {
		//if "session" > pull session-length prop
		//if "break" > pull break-length prop
	}
	ticker(){
		//when this.state.status == "running" > decrement "time-left" by 1 each 1000ms (stop at 00:00)
	}
	render() { 
		return (
			<div id="clock-wrap">
				<BreakHandler />
				<SessionHandler />
				<Beep />
			</div>
		);
	}
}//Timer
Timer.propTypes = {}
export default Timer;

class Display extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() { 
		return (
		<div id="display">
			<div id="timer-label"></div>
			<div id="time-left"></div>
		</div> );
	}
}
 
export default Display;
class BreakHandler extends Component {
	constructor(props) {
		super(props);		
	}
	render() { 
		return (  );
	}
}
BreakHandler.propTypes = {}
export default BreakHandler;

class SessionHandler extends Component {
	constructor(props) {
		super(props);		
	}
	render() { 
		return (  );
	}
}
SessionHandler.propTypes = {}; 
export default SessionHandler;

class Beep extends Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() { 
		return ( <div  id="beep" ></div> );
	}
} 
export default Beep;
 



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const timerElement = document.getElementById("pomo-wrap");
ReactDOM.render(< Timer />, timerElement);


