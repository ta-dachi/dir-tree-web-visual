import React from "react";
import ReactDOM from "react-dom";
import NetworkStatusComponent from "../components/NetworkStatusComponent";

export default function load() {
  window.addEventListener("load", () => {
    console.log("Event: Load");
    const networkCondition = navigator.onLine ? "Online" : "Offline";
    ReactDOM.render(
      <NetworkStatusComponent status={networkCondition} />,
      document.getElementById("status")
    );

    window.addEventListener("offline", () => {
      console.log("Event: Offline");
      ReactDOM.render(
        <NetworkStatusComponent status={"Offline"} />,
        document.getElementById("status")
      );
    });

    window.addEventListener("online", () => {
      console.log("Event: Online");
      ReactDOM.render(
        <NetworkStatusComponent status={"Online"} />,
        document.getElementById("status")
      );
    });
  });
}
