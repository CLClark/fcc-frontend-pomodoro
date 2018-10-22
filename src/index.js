//TODO: fix the number/sec/minute conversions

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
			break: 5,
			session: 25,
			timeLeft: (3)
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
		this.setState(prevState => {
			return {
				sessBreak: "session",
				break: 5,
				session: 25,
				timeLeft: (25*60)
			};			
		},() => { //after setting break/session lengths
			//force a reset on timer
			this.startStop(true);	
		});
		//stop/.load() beep
	}
	lengths(which, what){
		//which = "break" or "session"
		//what = "increment or "decrement"
		console.log(which + " " + what);
		switch (which) {
			case "break":
				let nowBreak = this.state.break;
				let nowUp; let nowDown;
				if( what == "decrement" && nowBreak == 0){
					nowDown = 0; } else {
					nowDown = (nowBreak - 1)
				}
				if( what == "increment" && nowBreak == 60){
					nowUp =  60;  } else {
					nowUp =(nowBreak + 1) }
				(what == "increment") ?
					this.setState({ break: nowUp }) :  
					this.setState({ break: nowDown });
				break;	
			default: //"session"
				let nowSession = this.state.session;
				let sessUp; let sessDown;
				if( what == "decrement" && nowSession == 0){ sessDown = 0; } else {
					sessDown = (nowSession - 1);				}
				if( what == "increment" && nowSession == 60){ sessUp =  60; } else {
					sessUp =(nowSession + 1); 				}
				(what == "increment") ?
					this.setState({ session: sessUp }) :  
					this.setState({ session: sessDown });
				break;
		}			
	}
	switcher () {
		//if "session" > pull session-length prop
		this.setState(prevState => {
			let which;
			let newTime;
			(prevState.sessBreak == "session") ? which = "break" : which = "session";
			(prevState.sessBreak == "session") ? newTime = prevState.break : newTime = prevState.session;
			// console.log(newTime);
			return { 
				sessBreak: which,
				timeLeft: newTime
			};
		});
		//if "break" > pull break-length prop
	}
	startStop (forceReset){
		//sets timer to paused or running; ternary
		(forceReset == true ) ?
		//forceReset 
		this.setState(prevState => {
			this.ticker("tock");//stop the timer
			return { running: false };
		}, () => {
			console.log('forced reset');
		}) :
		this.setState(prevState => {
			console.log('running was: ' + prevState.running);
			if (prevState.running == false) { //start the countdown
				this.ticker("tick");				
			} else {
				this.ticker("tock");				
			} //stop the countdown
			return { running: !prevState.running };
		}, () => {
			console.log('running is: ' + this.state.running);
		});
	}
	ticker(tickOrTock){
		//when this.state.status == "running" > decrement "time-left" by 1 each 1000ms (stop at 00:00)		
		switch (tickOrTock) {
			case "tick":
				//start the timer on "time-left"
				//set time-left to update on render
				this.tickInterval = window.setInterval(tickDown.bind(this), 1000);		
				break;
			default:
				//stop the timer
				window.clearInterval(this.tickInterval);
				//set time-left to not update on render
				break;
		}//switch
		function tickDown() {
			this.setState(prevState => {
				console.log(prevState.timeLeft);
				return { timeLeft: (prevState.timeLeft-1) };
			}, () => {
				if(this.state.timeLeft < 0){
					this.switcher();
				}
			});
		}
	}

	render() { 
		return (
			<div id="clock-wrap">
				<Display timeLeft={this.state.timeLeft} timerLabel={this.state.sessBreak} />
				<StartStop startStop={this.startStop} />
				<BreakHandler lengthControls={this.lengths} breakLength={this.state.break}/>
				<SessionHandler lengthControls={this.lengths} sessionLength={this.state.session} />
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


