import React from "react";
import "./styles/forecast-alert.css";

export class ForecastAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleAlert = this.toggleAlert.bind(this);
  }
  toggleAlert() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    return (
      <li onClick={this.toggleAlert}>
        {this.state.visible ? (
          <span
            className="glyphicon glyphicon-minus toggle-alert"
            aria-hidden="true"
          />
        ) : (
          <span
            className="glyphicon glyphicon-plus toggle-alert"
            aria-hidden="true"
          />
        )}
        <p className="alert-description">{this.props.text.description}</p>
        {this.state.visible && <p className="alert-text">{this.props.text.message}</p>}
      </li>
    );
  }
}

export default ForecastAlert;
