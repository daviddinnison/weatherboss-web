import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";
import Loader from "halogen/ClipLoader";

import { getAlert } from "../../../actions/forecast";

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

  componentDidMount() {
    this.props.dispatch(getAlert(this.props.name));
  }

  renderAlert() {
    if (this.props.alertLoading === true) {
      return (
        <div className="loader">
          <Loader color="#5a5a5a" size="20px" margin="4px" />
        </div>
      );
    } else {
      if (this.props.alert.length > 0) {
        const alerts = this.props.alert.map((item, index) => (
          <li key={index} onClick={this.toggleAlert}>
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
            <p className="alert-description">{item.description}</p>
            {this.state.visible && <p className="alert-text">{item.message}</p>}
          </li>
        ));
        return (
          <div className="alerts">
            <ul>{alerts}</ul>
          </div>
        );
      } else {
        return <div className="no-alerts">No weather alerts.</div>;
      }
    }
  }

  render() {
    return <div>{this.renderAlert()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    id: state.auth.currentUser.id,
    locations: state.protectedData.locations,
    alert: state.forecast.alert,
    alertLoading: state.forecast.alertLoading
  };
};

export default requiresLogin()(connect(mapStateToProps)(ForecastAlert));
