import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchLocations } from '../../actions/users';
import Locations from './locations';

import './styles/dashboard.css';

export class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard container">
                <div className="dashboard-username">
                    Welcome, {this.props.username}
                </div>
                <Locations />
                <div className="dashboard-add-location">
                    <Link to="/newlocation">Add location</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));