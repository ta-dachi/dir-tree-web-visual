import React from "react";
import ReactDOM from "react-dom";
import NetworkStatusSnackbar from "../components/NetworkStatusSnackbar";

export default function load() {
  window.addEventListener("load", () => {
    console.log("Event: Load");
    const networkCondition = navigator.onLine ? "Online" : "Offline";
    ReactDOM.render(
      <NetworkStatusSnackbar open={true} status={networkCondition} />,
      document.getElementById("status")
    );

    window.addEventListener("offline", () => {
      console.log("Event: Offline");
      ReactDOM.render(
        <NetworkStatusSnackbar open={true} status={"Offline"} />,
        document.getElementById("status")
      );
    });

    window.addEventListener("online", () => {
      console.log("Event: Online");
      ReactDOM.render(
        <NetworkStatusSnackbar open={true} status={"Online"} />,
        document.getElementById("status")
      );
    });
  });
}
