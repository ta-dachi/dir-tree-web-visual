import React from "react";
import ReactDOM from "react-dom";

import * as OfflinePluginRuntime from "offline-plugin/runtime";

// CSS
import "./css/index.scss";

// Components
import HelloWorld from "./js/components/HelloWorld";

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

ReactDOM.render(<HelloWorld />, document.getElementById("root"));
