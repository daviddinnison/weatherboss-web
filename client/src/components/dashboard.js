import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchLocations } from '../actions/users';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchLocations(this.props.id));
    }

    renderLocations() {
        if (this.props.locations.length === 0) {
            return (
                <div>
                    <p>nothing to see here.</p>
                </div>
            )
        }
        else {
            const locationsData = this.props.locations.map((item, index) =>
                <div>
                    <p>{item}</p>
                </div>
            )
            return (
                <div>
                    {locationsData}
                </div>
            )
        }
    }

    render() {
        console.log(this.props.locations, 'LOCATIONS FROM DASHBOARD PROPS')
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Username: {this.props.username}
                </div>
                <div className="dashboard-name">Name: {this.props.name}</div>

                {this.renderLocations()}

            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        id: state.auth.currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        protectedData: state.protectedData.data,
        locations: state.protectedData.locations
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));