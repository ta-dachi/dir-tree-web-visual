import React from "react";
import PropTypes from "prop-types";
import SortableTree, { toggleExpandedForAll } from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app

export default class FileTreeComponent extends React.Component {
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

    return (
      <div>
        <div>
          <button onClick={this.toggleNodeExpansion.bind(this, true)}>
            Expand all
          </button>
          <button
            className="collapse"
            onClick={this.toggleNodeExpansion.bind(this, false)}
          >
            Collapse all
          </button>
          <label>Search: </label>
          <input onChange={this.handleSearchOnChange.bind(this)} />
          <button className="previous" onClick={this.selectPrevMatch}>
            Previous
          </button>
          <button className="next" onClick={this.selectNextMatch}>
            Next
          </button>
          <label>
            {searchFocusIndex} / {searchFoundCount}
          </label>
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
