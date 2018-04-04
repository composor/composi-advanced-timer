import {h, Component} from 'composi';

const Controls = (props) => {

  if (props.status !== 'STARTED' && props.status !== 'STOPPED') {
    return (
    <div className="controls">
        <button className="btn btn-success btn-lg btn-block"
          onClick={props.onStart}
          disabled={!props.canStart}>
          START
        </button>
      </div>
    )
  } else if (props.status === 'STARTED' || props.status === 'STOPPED') {
    return (
      <div className="controls">
        {
          props.status === 'STARTED' &&
          <button className="btn btn-danger btn-lg"
            onClick={props.onStop}>
            STOP
          </button>
        }
        {
          props.status === 'STOPPED' &&
          <button className="btn btn-success btn-lg"
            onClick={props.onResume}>
            RESUME
          </button>
        }
        <button className="btn btn-primary btn-lg"
          onClick={props.onReset}>
          RESET
        </button>
      </div>
    )
  }
};

export default Controls;
