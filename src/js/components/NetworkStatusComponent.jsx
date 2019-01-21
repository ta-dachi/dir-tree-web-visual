import React from "react";
import PropTypes from "prop-types";

export default class NetworkStatusComponent extends React.Component {
  render() {
    return this.props.status;
  }
}

NetworkStatusComponent.propTypes = {
  status: PropTypes.string
};
