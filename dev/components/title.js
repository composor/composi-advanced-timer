import {h, Component} from 'composi'

export const title = new Component({
  container: 'header',
  render: (message) => {
    return (
      <nav>
        <i className="fa fa fa-clock-o text-white"></i>
        <h1>Composi {message}</h1>
      </nav>
    )
  }
})
