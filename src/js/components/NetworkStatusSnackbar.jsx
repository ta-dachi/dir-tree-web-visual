import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";

export default class NetworkStatusSnackbar extends React.Component {
  state = {
    open: true
  };

  handleClose() {
    this.setState({ open: false });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.open !== prevState.open) {
      this.setState({ open: true });
    }
  }

  render() {
    const { open } = this.state;
    const { status } = this.props;

    return (
      <div>
        <Snackbar
          open={open}
          onClose={this.handleClose.bind(this)}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{status}</span>}
          transitionDuration={500}
        />
      </div>
    );
  }
}

NetworkStatusSnackbar.propTypes = {
  open: PropTypes.bool,
  status: PropTypes.string
};
