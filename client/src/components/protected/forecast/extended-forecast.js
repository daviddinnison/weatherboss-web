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
        console.log('PROPS--------------------', this.props.extendedForecastData.forecastday[0].high)
        const tenDayData = this.props.extendedForecastData.forecastday.map((item, index) =>
            <li className="individual-day" key={item.period}>
                <img src={item.icon_url}></img>
                <p>Conditions: {item.conditions}</p>
            </li>
        );
        return (
            <div className="day-container">
                <h2>YOUR EXTENDED FORECAST!!!!</h2>
                <ul>
                    {tenDayData}
                </ul>
            </div>
        );
    }

    render() {
        return (
            <div>
                <h3>EXTENDED FORECAST</h3>
                <p>this will contain really cool extended forecast data. </p>
                <p>plz make yourself at home while david makes this.</p>
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