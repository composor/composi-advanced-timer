import { h, Component } from 'composi';
import Time from '../../lib/time';

const Display = (props) => {

  const time = new Time();

  return (
    <div>
      {
        props.timeInterval && (
          <div className="display-countdown">
            <div>
              <label type="text" className="display-countdown-label">H</label>
              <label type="text" className="display-countdown-label">M</label>
              <label type="text" className="display-countdown-label">S</label>
              <label type="text" className="display-countdown-label">MS</label>
            </div>
            <div className="display-countdown-time">
              {time.getTime(props.timeInterval)}
            </div>
          </div>
        )
      }

      {!props.timeInterval &&
        <div className="display">
          <div>
            <div>
              <label type="text" className="display-label">H</label>
              <label type="text" className="display-label">M</label>
              <label type="text" className="display-label">S</label>
            </div>

            <div className="input-group input-group-lg display-input-group">
              <input type="text" 
                className="form-control display-time display-hours"
                maxLength="2"
                placeholder="00"
                onFocus={() => props.onFocusChange('HH')}
                value={props.hours}
                onChange={props.onInputChange} />
              
              <span className="display-time display-separator">:</span>
              
              <input type="text"
                className="form-control display-time display-minutes"
                maxLength="2"
                placeholder="00"
                onFocus={() => props.onFocusChange('MM')} 
                value={props.minutes}
                onChange={props.onInputChange} />
              
              <span className="display-time display-separator">:</span>
              
              <input type="text"
                className="form-control display-time display-seconds"
                maxLength="2"
                placeholder="00"
                onFocus={() => props.onFocusChange('SS')}
                value={props.seconds}
                onChange={props.onInputChange} />
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Display;
