import React, { Component } from "react";
import WelcomeMessage from "./welcomeMessage";
// import styled from "styled-components";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppBar />
        <WelcomeMessage />
      </AppLayout>
    );
  }
}

export default App;
