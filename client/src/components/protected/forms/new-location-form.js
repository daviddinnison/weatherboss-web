import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import requiresLogin from '../../requires-login';

export class NewLocationForm extends React.Component {
    submitForm(event) {
        event.preventDefault();
        const input = this.userInput.value;
        console.log('USER ENTERED.......', input)
    }

    render() {
        return (
            <form
                className="location-form"
                onSubmit={event => this.submitForm(event)}
            >
                <input
                    type="text"
                    name="location-input"
                    required
                    placeholder="enter location"
                    id="userInput"
                    ref={input => (this.userInput = input)}
                />
                <button type="submit">Submit</button>
            </form>
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

export default requiresLogin()(connect(mapStateToProps)(NewLocationForm));