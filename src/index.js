//TODO: fix the number/sec/minute conversions
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

const bodyStyle = {
	fontFamily: "Arial, Helvetica, sans-serif",
	margin: "auto",
	width: "300px",
	height: "300px",
	border: "2px solid green",
	borderRadius: "2px",
	textAlign: "center",
	display: "flex",
	flexDirection: "column",
	overflow: "hidden"
}
const startStopStyle={
	backgroundColor: "#46ff6d",
	display: "flex",
	// flexDirection: "column",
	flexGrow: 1,
	alignItems: "center",
	justifyContent: "center"
}
const startStopText={
	maxWidth: "50%"
}
const resetButton={
	backgroundColor: "tomato",
	display:"flex",
	// flexGrow: 0.5,
	alignItems: "center",
	justifyContent: "center",
	padding: "10px"
}
const resetText = {
	maxWidth: "50%"
}
const row1 = {
	border: "1px solid black",
	backgroundColor: "#ff3716",
	flexGrow: 1,
	display: "flex"
}
const row3 = {
	border: "1px solid black",
	flexGrow: 1,
	display: "flex",
	backgroundColor: "#f3f4f9"	
}
const col2 = {
	display: "flex",
	flexDirection: "row",
	flexGrow: 0.5,
	backgroundImage: "linear-gradient(#9e9495, #f3f4f9)"	
}
const displayStyle={
	display:"flex",
	flexDirection:"column",
	flexGrow: 1
}
const handlerCols = {	
	flexGrow: 1,
	display: "flex",
	flexDirection: "column",
	padding: "2px"
}
const handlerRows = {
	display: "flex",
	flexDirection: "row"
}
const handlerButton = {
	flexGrow: 1
	// border: "1px inset black"
}
const timeStyle = {
	flexGrow: 1,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "xx-large",
	color:"black",
	borderColor: "red",
	borderWidth: "1px",
	borderStyle: "dotted",
	margin: "10px",
	backgroundColor: "white",
}
const timerLabelStyle={
	// flex: 1,
	textDecoration: "underline overline",
	paddingTop: "10px",
	fontWeight: "bold",
	fontSize: "large"
}
const lengthStyle = {
	backgroundColor: "white",
	border: "2px ridge lightgray",
	flexGrow: 2

}
class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			sessBreak: "SESSION",
			break: 5,
			session: 25,
			timeLeft: (25*60)
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
		document.getElementById("beep").pause(); 
		document.getElementById("beep").currentTime = 0;
		console.log(document.getElementById("beep").duration);		
		this.setState(prevState => {			
			return {
				initialized: true,
				sessBreak: "SESSION",
				break: 5,
				session: 25,
				timeLeft: (25*60)
			};			
		},() => { //after setting break/session lengths
			//force a reset on timer
			this.startStop(true);	
			document.getElementById("display").style.backgroundColor = "#ff3716" ;		
		});				
	}
	lengths(which, what){
		//which = "break" or "session"
		//what = "increment or "decrement"
		console.log(which + " " + what);
		switch (which) {
			case "BREAK":
				let nowBreak = this.state.break;
				let nowUp; let nowDown;
				if( what == "decrement" && nowBreak == 1){
					nowDown = 1; } else {
					nowDown = (nowBreak - 1)
				}
				if( what == "increment" && nowBreak == 60){
					nowUp =  60;  } else {
					nowUp =(nowBreak + 1) }
				(what == "increment") ?
					this.setState({ break: nowUp }) :  
					this.setState({ break: nowDown });
				break;	
			default: //"SESSION"
				let nowSession = this.state.session;
				let sessUp; let sessDown;
				if( what == "decrement" && nowSession == 1){ sessDown = 1; } else {
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
			(prevState.sessBreak == "SESSION") ? which = "BREAK" : which = "SESSION";
			(prevState.sessBreak == "SESSION") ? newTime = prevState.break : newTime = prevState.session;
			//some GUI indication:
			(prevState.sessBreak == "SESSION") ? document.getElementById("display").style.backgroundColor = "lightblue" : document.getElementById("display").style.backgroundColor = "#ff3716" ;
			return { 
				sessBreak: which,
				timeLeft: (newTime*60)
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
			return { running: !prevState.running };
		}, () => {
			if (this.state.running == true) { //start the countdown
				this.ticker("tick");				
			} else {
				this.ticker("tock");				
			} //stop the countdown
			console.log('running is: ' + this.state.running);
		});
	}
	ticker(tickOrTock){
		//when this.state.status == "running" > decrement "time-left" by 1 each 1000ms (stop at 00:00)		
		switch (tickOrTock) {
			case "tick":
				//start the timer on "time-left"
				//set time-left to update on render
				if(this.state.initialized == false){
					this.tickInterval = window.setInterval(tickDown.bind(this), 1000);
				}else{
					//if this is the first "tick," then use the most current "session-length" value from state
					this.setState(prevState => {						
						return { 
							timeLeft: (prevState.session*60),
							initialized: false 
						};
					},() => {
						this.tickInterval = window.setInterval(tickDown.bind(this), 1000);
					});
				}//else				
				break;
			default:
				//stop the timer
				window.clearInterval(this.tickInterval);
				//set time-left to not update on render
				break;
		}//switch
		let nodeToPlay = document.getElementById("beep");
		// nodeToPlay.load();
		function tickDown() {
			this.setState(prevState => {
				//check time-left and beep accordingly
				if(prevState.timeLeft== 0){
					nodeToPlay.play();}
				//update timeleft
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
			<div id="clock-wrap"  style={bodyStyle}>
				<div className="row1" style={row1} >
					<Display timeLeft={this.state.timeLeft} timerLabel={this.state.sessBreak} />
					<div id="reset"  onClick={this.reset} className="actionButton" style={resetButton}>
						<div id="reset-text" >reset</div>							
					</div>
				</div>

				<div className="row1" style={col2} >
					<SessionHandler  lengthControls={this.lengths} sessionLength={this.state.session} />
					<BreakHandler lengthControls={this.lengths} breakLength={this.state.break} />
				</div>

				<div className="row1" style={row3} >
					<StartStop startStop={this.startStop}/>									
				</div>
			</div>
		);
	}
}//Timer
Timer.propTypes = {}

class Display extends React.Component {
	constructor(props) {
		super(props);
		this.state = {  }
	}
	convertSeconds = (seconds) => {
		let secondsIn = Number.parseInt(seconds);

		let minutes;
		( Math.floor(secondsIn/60) > 9) ?
		minutes  = Math.floor(secondsIn/60):
		minutes = ("0" + Math.floor(secondsIn/60));

		let secondsLeft;
		(Math.floor(secondsIn%60) > 9) ?			
			secondsLeft = Math.floor(secondsIn%60):
			secondsLeft = ("0" + Math.floor(secondsIn%60));

		return ( minutes + ":" + secondsLeft );
	}
	render() { 
		return (
		<div id="display" style={displayStyle}>
			<div id="timer-label" style={timerLabelStyle}>{this.props.timerLabel}</div>
			<br></br>
			<div>Time Left:</div>
			<div id="time-left" style={timeStyle}>
				{this.convertSeconds(this.props.timeLeft)}
			</div>
		</div> );
	}
} 
// export default Display;
class StartStop extends React.Component {
	constructor(props) {
		super(props);		
	}
	shouldComponentUpdate(nextProps, nextState) {
		return false;
	}
	render() { 
		return (
		<div id="start_stop" className="actionButton" style={startStopStyle} onClick={this.props.startStop}>
			<div id="start-stop-text" style={startStopText}>
			Start
			Stop
			</div>
		</div>
		);
	}
}
class BreakHandler extends React.Component {
	constructor(props) {
		super(props);		
	}
	incrementer = () => {
		this.props.lengthControls("BREAK", "increment");
		return ( "increment break" );
	};
	decrementer = () => {
		this.props.lengthControls("BREAK", "decrement");
		return ( "decrement break" );
	};
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.breakLength == this.props.breakLength){
			return false;}
		else{
			return true;}
	}
	render() { 
		return (
		<div id="break-handler" style={handlerCols}>
			<div id="break-label">Break Length</div>
			<div id="break-rows" style={handlerRows}>
				<div id="break-decrement" style={handlerButton} className="actionButton" onClick={this.decrementer}>-</div>	
				<div id="break-length" style={lengthStyle}  >{this.props.breakLength}</div>
				<div id="break-increment" style={handlerButton}  className="actionButton" onClick={this.incrementer}>+</div>
			</div>
		</div>);
	}
}
BreakHandler.propTypes = {}
// export default BreakHandler;

class SessionHandler extends React.Component {
	constructor(props) {
		super(props);		
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.sessionLength == this.props.sessionLength){
			return false;}
		else{
			return true;}
	}
	incrementer = () => {
		this.props.lengthControls("SESSION", "increment");
		return ( "increment session" );
	};
	decrementer = () => {
		this.props.lengthControls("SESSION", "decrement");
		return ( "decrement session" );
	};
	render() { 
		return (
		<div id="session-handler" style={handlerCols}>
			<div id="session-label">Session Length:</div>
			<div id="session-row" style={handlerRows}>								
				<div id="session-decrement" style={handlerButton} className="actionButton" onClick={this.decrementer}>-</div>
				<div id="session-length" style={lengthStyle} >{this.props.sessionLength}</div>	
				<div id="session-increment" style={handlerButton}  className="actionButton" onClick={this.incrementer}>+</div>				
			</div>
		</div>);
	}
}
SessionHandler.propTypes = {}; 

class Beep extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {					
	}
	shouldComponentUpdate(nextProps, nextState) { 
		return false;}
	render() { 
		return ( 
			<audio  id="beep" preload="auto" >
				<source src="http://66.90.93.122/ost/pokemon-gameboy-sound-collection/iniyxrzp/111-pokemon%20recovery.mp3" type="audio/mp3" />
			</audio> );
	}
}
class PlaySound extends React.Component {
	constructor(props){super(props);}
	componentDidMount() {
		console.log("playsound: " + document.getElementById("beep").readyState);	
	}
	playIt = () => {
		console.log("clicked playsound: " + document.getElementById("beep").readyState);	
		let d = document.getElementById("beep").duration;
		console.log(d);	
	}	 
	render() { 
		return ( <div id="play-button" onClick={this.playIt}>PLAY IT</div>);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const timerElement = document.getElementById("pomo-wrap");
ReactDOM.render(< Timer />, timerElement);

