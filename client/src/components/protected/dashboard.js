import React from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchLocations } from '../../actions/users';
import Locations from './locations';

export class Dashboard extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>
                <Locations/>
                <Link to="/newlocation">Add location</Link>
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