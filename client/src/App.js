import logo from "./logo.svg";
import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";

function App() {
  useEffect(() => {
    const OneSignal = window.OneSignal;
  
    OneSignal.push(function () {
      OneSignal.init({
        appId: "41998dbe-0c68-4d54-bd48-2d3ddb5aad9b",
      });
      OneSignal.getUserId( function(userId) {
        console.log("UserId: " + userId)
          let externalUserId = "6123703c04ef1f4cac51db1e";
        OneSignal.setExternalUserId(externalUserId);
        // Make a POST call to your server with the user ID
        // Mixpanel Example
        // mixpanel.people.set({ $onesignal_user_id: userId });
      });
    });
    // data()
  }, []);

  const data = async () => {
    const configs = {
      method: "GET",
      url: "http://localhost:7000/",
      headers: {
        "content-type": "application/json",
      },
    };
    const details = await axios(configs);
    console.log("details", details);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
