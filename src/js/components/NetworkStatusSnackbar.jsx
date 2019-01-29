import React from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import classNames from "classnames";
import WarningIcon from "@material-ui/icons/Warning";
import { withStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

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
  const { classes, variant, message } = props;
  const Icon = variantIcon[variant];
  console.log(props);
  return (
    <SnackbarContent
      className={classNames(classes[variant])}
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
    />
  );
}

const CustomSnackbarContentWrapper = withStyles(styles)(CustomSnackbarContent);

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
        <Snackbar
          open={open}
          onClose={this.handleClose.bind(this)}
          transitionDuration={500}
        >
          <CustomSnackbarContentWrapper variant={vari} message={status} />
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
