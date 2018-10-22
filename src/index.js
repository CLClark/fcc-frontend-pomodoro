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
		}
		this.reset = this.reset.bind(this);
		this.switcher = this.switcher.bind(this);
		this.ticker = this.ticker.bind(this);
		this.lengths = this.lengths.bind(this);
		this.startStop = this.startStop.bind(this);
	}
	reset(){
		//set session-length
		//set break-length
		//stop/.load() beep
		//set timer.running = false
		///set timer session: switch() fn
	}
	lengths(which, what){
		//which = "break" or "session"
		//what = "increment or "decrement"
		console.log(which + " " + what);
		switch (which) {
			case "break":
				let nowBreak = this.state.breakLength;
				let nowUp; let nowDown;
				if( what == "decrement" && nowBreak == 0){
					nowDown = 0; } else {
					nowDown = (nowBreak - 1)
				}
				if( what == "increment" && nowBreak == 60){
					nowUp =  60;  } else {
					nowUp =(nowBreak + 1) }
				(what == "increment") ?
					this.setState({ breakLength: nowUp }) :  
					this.setState({ breakLength: nowDown });
				break;	
			default: //"session"
				let nowSession = this.state.sessLength;
				let sessUp; let sessDown;
				if( what == "decrement" && nowSession == 0){ sessDown = 0; } else {
					sessDown = (nowSession - 1);				}
				if( what == "increment" && nowSession == 60){ sessUp =  60; } else {
					sessUp =(nowSession + 1); 				}
				(what == "increment") ?
					this.setState({ sessLength: sessUp }) :  
					this.setState({ sessLength: sessDown });
				break;
		}			
	}
	switcher () {
		//if "session" > pull session-length prop
		//if "break" > pull break-length prop
	}
	startStop (){
		//sets timer to paused or running
		this.setState({ running: !this.state.running },() => {
			console.log('running: ' + this.state.running);
			if(this.state.running == true){ //start the countdown
				this.ticker("tick");				
			}else{ this.ticker("tock") } //stop the countdown
		});
	}
	ticker(tickOrTock){
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
		return (
			<div id="clock-wrap">
				<Display timeLeft={"00:00"} timerLabel={this.state.sessBreak} />
				<StartStop startStop={this.startStop} />
				<BreakHandler lengthControls={this.lengths} breakLength={this.state.breakLength}/>
				<SessionHandler lengthControls={this.lengths} sessionLength={this.state.sessLength} />
				<Beep />
			</div>
		);
	}
}//Timer
Timer.propTypes = {}
// // export default Timer;

class Display extends React.Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() { 
		return (
		<div id="display">
			<div id="timer-label">{this.props.timerLabel}</div>
			<div id="time-left">{this.props.timeLeft}</div>
		</div> );
	}
} 
// export default Display;
class StartStop extends React.Component {
	constructor(props) {
		super(props);		
	}
	render() { 
		return ( <div id="start_stop" onClick={this.props.startStop}>Start Stop</div> );
	}
}
 
// export default StartStop;
class BreakHandler extends React.Component {
	constructor(props) {
		super(props);		
	}
	incrementer = () => {
		this.props.lengthControls("break", "increment");
		return ( "increment break" );
	};
	decrementer = () => {
		this.props.lengthControls("break", "decrement");
		return ( "decrement break" );
	};
	render() { 
		return (
		<div>
			<div id="break-label">BREAK</div>
			<div id="break-length">{this.props.breakLength}</div>
			<div id="break-increment" onClick={this.incrementer}>breakincrement</div>			
			<div id="break-decrement" onClick={this.decrementer}>breakdecrement</div>			
		</div>);
	}
}
BreakHandler.propTypes = {}
// export default BreakHandler;

class SessionHandler extends React.Component {
	constructor(props) {
		super(props);		
	}
	incrementer = () => {
		this.props.lengthControls("session", "increment");
		return ( "increment session" );
	};
	decrementer = () => {
		this.props.lengthControls("session", "decrement");
		return ( "decrement session" );
	};
	render() { 
		return (
		<div>
			<div id="session-label">SESSION</div>
			<div id="session-length">{this.props.sessionLength}</div>
			<div id="session-increment" onClick={this.incrementer}>sessionincrement</div>			
			<div id="session-decrement" onClick={this.decrementer}>sessiondecrement</div>			
		</div>);
	}
}
SessionHandler.propTypes = {}; 
// export default SessionHandler;

class Beep extends React.Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	render() { 
		return ( <audio  id="beep" ></audio> );
	}
} 
// export default Beep;
 



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const timerElement = document.getElementById("pomo-wrap");
ReactDOM.render(< Timer />, timerElement);


