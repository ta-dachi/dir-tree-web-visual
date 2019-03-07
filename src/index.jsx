import React from "react";
import ReactDOM from "react-dom";

import * as OfflinePluginRuntime from "offline-plugin/runtime";
import load from "./js/offline/windowEvents";
import { formatBytes } from "./js/utility/formatBytes";
import * as anime_archived from "./assets/anime_archived.json";
import * as anime_02 from "./assets/anime_02.json";
import * as anime_03 from "./assets/anime_03.json";
import * as anime_04 from "./assets/anime_04.json";

// CSS
import "./css/index.scss";
import FileTreeComponent from "./js/components/FileTreeComponent";

// Components
import NetworkStatusSnackbar from "./js/components/NetworkStatusSnackbar";

// Material UI
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import theme from "./js/themes/themes.jsx";

load();
const json = [
  anime_archived.default,
  anime_02.default,
  anime_03.default,
  anime_04.default
];
const total_size = formatBytes(
  anime_archived.default.size +
    anime_02.default.size +
    anime_03.default.size +
    anime_04.default.size,
  4
);

OfflinePluginRuntime.install({
  onInstalled: () => {
    console.log("SW Event: onInstalled");
  },

  onUpdating: () => {
    console.log("SW Event: onUpdating");
  },

  onUpdateReady: () => {
    console.log("SW Event: onUpdateReady");
    // Tells to new SW to take control immediately
    OfflinePluginRuntime.applyUpdate();
  },

  onUpdated: () => {
    console.log("SW Event: onUpdated");
  }
});

class App extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    // the setTimeout just simulates an async action, after which the component will render the content
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  render() {
    const { loading } = this.state;
    const networkCondition = navigator.onLine ? "Online" : "Offline";

    if (loading) {
      // if your component doesn't have to wait for an async action, remove this block
      return null; // render null when app is not ready
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div>AniList - {total_size}</div>
        <FileTreeComponent treeData={json} />
        <NetworkStatusSnackbar open={true} status={networkCondition} />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
