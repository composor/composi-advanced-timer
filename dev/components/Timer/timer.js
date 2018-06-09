import { h, Component } from 'composi';
import Display from './display';
import Keypad from './keypad';
import Controls from './controls';

class Timer extends Component {

  constructor(props) {
    super(props);
    this.container = 'section'
    this.state = {
      hours: '00',
      minutes: '00',
      seconds: '00',
      unitOfTime: null,
      status: null,
      canStart: null
    };

    this.handleDisplayFocusChange = this.handleDisplayFocusChange.bind(this);
    this.handleKeypadClick = this.handleKeypadClick.bind(this);
    this.handleControlsStart = this.handleControlsStart.bind(this);
    this.handleControlsResume = this.handleControlsResume.bind(this);
    this.handleControlsStop = this.handleControlsStop.bind(this);
    this.handleControlsReset = this.handleControlsReset.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }


  // HANDLE DISPLAY
  handleDisplayFocusChange(unitOfTime) {
    console.log(unitOfTime)
    this.setState(prevState => {
      prevState.unitOfTime = unitOfTime
      return prevState
    });
  }


  // HANDLE KEYPAD
  handleKeypadClick(time) {

    if (this.state.unitOfTime === 'HH') {
      this.setHours(time);
    } else if (this.state.unitOfTime === 'MM') {
      this.setMinutes(time);
    } else if (this.state.unitOfTime === 'SS') {
      this.setSeconds(time);
    }

    this.canStart();
  }

  setHours(hours) {
    if (hours < 0) {
      this.setState(prevState => { 
        prevState.hours = '00' 
        return prevState
      });
    } else {
      this.setState(prevState => {
        hours = parseInt(this.formatTime(prevState.hours + hours));

        if (hours > 99) {
          hours = prevState.hours;
        }
        prevState.hours = this.formatTime(hours)
        return prevState;
      });
    }
  }

  setMinutes(minutes) {
    if (minutes < 0) {
      this.setState(prevState => { 
        prevState.minutes = '00' 
        return prevState
      });
    } else {
      this.setState(prevState => {
        minutes = parseInt(this.formatTime(prevState.minutes + minutes));

        if (minutes < 60) {
          if (parseInt(minutes.toString()[0]) > 5) {
            minutes = 59;
          }
        } else if (minutes > 59) {
          minutes = parseInt(minutes.toString().slice(minutes.toString().length - 1));
        }
        prevState.minutes = this.formatTime(minutes)
        return prevState;
      });
    }
  }

  setSeconds(seconds) {

    if (seconds < 0) {
      this.setState(prevState => {
        prevState.seconds = '00'
        return prevState
      });
    } else {
      this.setState(prevState => {
        seconds = parseInt(this.formatTime(prevState.seconds + seconds));

        if (seconds < 60) {
          if (parseInt(seconds.toString()[0]) > 5) {
            seconds = 59;
          }
        } else if (seconds > 59) {
          seconds = parseInt(seconds.toString().slice(seconds.toString().length - 1));
        }
        prevState.seconds = this.formatTime(seconds)

        return prevState;
      });
    }
  }

  formatTime(time) {
    time = parseInt(time);
    return time < 10 ? '0' + time : time.toString().slice(time.toString().length - 2);
  }


  // HANDLE CONTROLS
  canStart() {

    this.setState(prevState => {
      prevState.canStart = prevState.status !== 'STARTED' && (parseInt(prevState.hours) > 0
        || parseInt(prevState.minutes) > 0
        || parseInt(prevState.seconds) > 0)
      return prevState
    });
  }

  handleControlsStart() {
    this.startTimer();
  }

  startTimer() {
    if (this.state.status !== 'STARTED') {

      this.setState(prevState => { 
        prevState.status = 'STARTED' 
        return prevState
      });

      const totalMilliseconds = ((parseInt(this.state.hours) * 60 * 60)
        + (parseInt(this.state.minutes) * 60)
        + parseInt(this.state.seconds))
        * 1000;

      this.setState(prevState => { 
        prevState.timeInterval = parseInt(totalMilliseconds) 
        return prevState
      });

      this.interval = setInterval(() => {

        this.setState(prevState => { 
          prevState.timeInterval = prevState.timeInterval - 10
          return prevState 
        });

        if (this.state.timeInterval === 0) {
          clearInterval(this.interval);
          this.setState(prevState => { 
            prevState.status = null 
          });
        }
      }, 10);
    }
  }

  handleControlsStop() {
    if (this.state.status === 'STARTED') {
      clearInterval(this.interval);
      this.setState(prevState => { 
        prevState.status = 'STOPPED' 
        return prevState
      });
    }
  }

  handleControlsResume() {
    if (this.state.status === 'STOPPED') {
      this.interval = setInterval(() => {

        this.setState(prevState => {
          prevState.status= 'STARTED',
          prevState.timeInterval = prevState.timeInterval - 10 
          return prevState
        });

        if (this.state.timeInterval === 0) {
          clearInterval(this.interval);
          this.setState(prevState => { 
            prevState.status = null 
            return prevState
          });
        }
      }, 10);
    }
  }

  handleControlsReset() {
    clearInterval(this.interval);
    this.setState(prevState => { 
      prevState.status = null
      prevState.timeInterval = null 
      return prevState
    });
  }


  // RENDER
  render() {
    return (
      <div className="timer">
        <Display onFocusChange={this.handleDisplayFocusChange}
          hours={this.state.hours}
          minutes={this.state.minutes}
          seconds={this.state.seconds}
          timeInterval={this.state.timeInterval} />

        <Keypad onClick={this.handleKeypadClick} status={this.state.status} />

        <Controls onStart={this.handleControlsStart}
          onStop={this.handleControlsStop}
          onResume={this.handleControlsResume}
          onReset={this.handleControlsReset}
          canStart={this.state.canStart}
          status={this.state.status} />
      </div>
    );
  }
}

export default Timer;
