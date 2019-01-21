import React from "react";
import PropTypes from "prop-types";
import SortableTree, { toggleExpandedForAll } from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
// Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  textField: {
    margin: theme.spacing.unit,
    marginTop: 35,
    width: 300
  }
});

class FileTreeComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: this.props.treeData,
      searchString: "",
      searchFocusIndex: 0,
      searchFoundCount: null
    };
  }

  toggleNodeExpansion = expanded => {
    this.setState(prevState => ({
      treeData: toggleExpandedForAll({
        treeData: prevState.treeData,
        expanded
      })
    }));
  };

  handleSearchOnChange = e => {
    this.setState({
      searchString: e.target.value
    });
  };

  selectPrevMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFoundCount + searchFocusIndex - 1) % searchFoundCount
          : searchFoundCount - 1
    });
  };

  selectNextMatch = () => {
    const { searchFocusIndex, searchFoundCount } = this.state;

    this.setState({
      searchFocusIndex:
        searchFocusIndex !== null
          ? (searchFocusIndex + 1) % searchFoundCount
          : 0
    });
  };

  render() {
    const {
      treeData,
      searchString,
      searchFocusIndex,
      searchFoundCount
    } = this.state;

    const { classes } = this.props;

    return (
      <div>
        <div>
          <Button
            onClick={this.toggleNodeExpansion.bind(this, true)}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Expand all
          </Button>
          <Button
            className={classes.button}
            onClick={this.selectPrevMatch}
            variant="contained"
          >
            Previous
          </Button>
          <TextField
            onChange={this.handleSearchOnChange.bind(this)}
            className={classes.textField}
            label="Search"
          />
          {/* <label>
            {searchFocusIndex} / {searchFoundCount}
          </label> */}
          <Button
            className={classes.button}
            onClick={this.selectNextMatch}
            variant="contained"
          >
            Next
          </Button>
          <Button
            onClick={this.toggleNodeExpansion.bind(this, false)}
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Collapse all
          </Button>
        </div>
        <SortableTree
          treeData={treeData}
          onChange={treeData => this.setState({ treeData })}
          canDrag={false}
          searchQuery={searchString}
          searchFocusOffset={searchFocusIndex}
          onlyExpandSearchedNodes={true}
          searchFinishCallback={matches =>
            this.setState({
              searchFoundCount: matches.length,
              searchFocusIndex:
                matches.length > 0 ? searchFocusIndex % matches.length : 0
            })
          }
          isVirtualized={true}
        />
      </div>
    );
  }
}

FileTreeComponent.propTypes = {
  treeData: PropTypes.array
};

export default withStyles(styles)(FileTreeComponent);
