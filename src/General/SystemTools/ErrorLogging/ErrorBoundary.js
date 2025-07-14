import React, { Component } from "react";
import PropTypes from "prop-types";
import { reportError } from "General/SystemTools/ErrorLogging/ErrorReporting";

export default class ErrorBoundary extends Component {
  state = {
    error: "",
    errorInfo: "",
    hasError: false,
  };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.log({ error, errorInfo });
    reportError("", "ErrorBoundary", error, "");
    this.setState({ errorInfo });
  }
  render() {
    // next code block goes here
    const {error, hasError} = this.state
    if (hasError) {
      return <div>
      <div>
        {error.name === 'ChunkLoadError' ?
          <div>
            This application has been updated, please refresh your browser to see the latest content.
          </div>
          :
          <div style={{color: "white", textAlign: "center", paddingTop: "20px"}}>
            An error has occurred but it's been automatically reported and will be fixed ASAP. 
          </div>}
      </div>
      </div>
    }

    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
