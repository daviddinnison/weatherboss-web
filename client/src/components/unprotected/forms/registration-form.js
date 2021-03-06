import React from "react";
import { Field, reduxForm, focus } from "redux-form";
import { registerUser } from "../../../actions/users";
import { login } from "../../../actions/auth";
import Input from "./input";
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed
} from "../../../validators";
import "./styles/registration-form.css";

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { username, password } = values;
    const user = { username, password };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(username, password)));
  }

  render() {
    return (
      <form
        className="registration-form"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <Field
          component={Input}
          type="text"
          name="username"
          validate={[required, nonEmpty, isTrimmed]}
        />
        <label htmlFor="username">Username</label>
        <Field
          component={Input}
          type="password"
          name="password"
          validate={[required, length({ min: 4, max: 72 }), isTrimmed]}
        />
        <label htmlFor="password">Password</label>
        <Field
          component={Input}
          type="password"
          name="passwordConfirm"
          validate={[required, nonEmpty, matches("password")]}
        />
        <label htmlFor="passwordConfirm">Confirm password</label>
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}
        >
          Register
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: "registration",
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus("registration", Object.keys(errors)[0]))
})(RegistrationForm);
