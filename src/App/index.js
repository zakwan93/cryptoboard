import React, { Component } from "react";
// import styled from "styled-components";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import AppProvider from "./AppProvider";
import Settings from "../Settings";
import "./App.css";

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar />
          <Settings />
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
