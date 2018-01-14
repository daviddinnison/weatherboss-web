import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchLocations } from '../actions/users';

export class Locations extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchLocations(this.props.id));
    }

    renderLocations() {
        if (this.props.locations.length === 0) {
            return (<div><p>nothing to see here</p></div>)
        } else {
            const locationsData = this.props.locations.map((item, index) =>
                <div>
                    <p>{item}</p>
                </div>
            )
            return (
                <div>
                    {locationsData}
                </div>
            );
        }
    }

    render() {
        return (
            <div>
                {this.renderLocations()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        id: state.auth.currentUser.id,
        locations: state.protectedData.locations
    };
};

export default requiresLogin()(connect(mapStateToProps)(Locations));