import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import WarningIcon from "@material-ui/icons/Warning";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon
};

const styles = theme => ({
  success: {
    backgroundColor: green[600]
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
});

function CustomSnackbarContent(props) {
  const { classes, variant, message, onClose } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant])}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
    />
  );
}

const CustomSnackbarContentWrapper = withStyles(styles)(CustomSnackbarContent);

CustomSnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["success", "warning"]).isRequired
};

class NetworkStatusSnackbar extends React.Component {
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

    let vari;
    if (status === "Online") {
      vari = "success";
    } else {
      vari = "warning";
    }

    return (
      <div>
        <Snackbar open={open} onClose={this.handleClose.bind(this)}>
          <CustomSnackbarContentWrapper
            variant={vari}
            message={status}
            onClose={this.handleClose.bind(this)}
          />
        </Snackbar>
      </div>
    );
  }
}

NetworkStatusSnackbar.propTypes = {
  open: PropTypes.bool,
  status: PropTypes.string
};

export default NetworkStatusSnackbar;
// export default NetworkStatusSnackbar;
