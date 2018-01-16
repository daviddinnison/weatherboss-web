import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import requiresLogin from '../../requires-login';
import BackButton from '../../reusable/back-button';
import { getExtendedForecast } from '../../../actions/forecast';

export class ExtendedForecast extends React.Component {
    componentDidMount() {
        const location = this.props.name;
        this.props.dispatch(getExtendedForecast(location))
    }
    renderDays() {
        const tenDayData = this.props.extendedForecastData.forecastday.map((item, index) =>
            <li className="individual-day" key={index}>
                <h4>{item.date.weekday}, {item.date.monthname} {item.date.day}</h4>
                <img src={item.icon_url}></img>
                <p>Conditions: {item.conditions}</p>
                <p>high: {item.high.fahrenheit}° F</p>
                <p>low: {item.low.fahrenheit}° F</p>
            </li>
        );
        return (
            <div className="extended-forecast">
                <ul>
                    {tenDayData}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderDays()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        id: state.auth.currentUser.id,
        locations: state.protectedData.locations,
        extendedForecastData: state.forecast.extendedForecastData
    };
};

export default requiresLogin()(connect(mapStateToProps)(ExtendedForecast));