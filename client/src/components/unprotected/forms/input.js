import React from "react";
import "./styles/input.css";

export default class Input extends React.Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.meta.active && this.props.meta.active) {
      this.input.focus();
    }
  }

  render() {
    let error;
    if (this.props.meta.touched && this.props.meta.error) {
      error = <div className="form-error">{this.props.meta.error}</div>;
    }


    return (
      <div className="form-input">
        <input
          {...this.props.input}
          id={this.props.input.name}
          type={this.props.type}
          ref={input => (this.input = input)}
        />
        <label htmlFor={this.props.input.name} className="login-label">
          {this.props.label}
        </label>
        {error}
      </div>
    );
  }
}
