import React from "react";
import { connect } from "react-redux";
import requiresLogin from "../../requires-login";
import Loader from "halogen/ClipLoader";

import RenderedAlert from "./rendered-alert";

import { getAlert } from "../../../actions/forecast";

import "./styles/forecast-alert.css";

export class ForecastAlert extends React.Component {
  componentDidMount() {
    this.props.dispatch(getAlert(this.props.name));
  }

  renderAlert() {
    if (this.props.alertLoading) {
      return (
        <div className="loader">
          <Loader color="#5a5a5a" size="20px" margin="4px" />
        </div>
      );
    } else {
      if (this.props.alert.length > 0) {
        const alerts = this.props.alert.map((item, index) => (
          <RenderedAlert text={item} key={index}/>
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
