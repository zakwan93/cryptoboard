import React, { Component } from "react";
// import styled from "styled-components";
import AppLayout from "./AppLayout";
import AppBar from "./AppBar";
import AppProvider from "./AppProvider";
import Settings from "../Settings";
import DashBoard from "../Dashboard";
import Content from "../Shared/Content";
import "./App.css";

class App extends Component {
  render() {
    return (
      <AppLayout>
        <AppProvider>
          <AppBar />
          <Content>
            <Settings />
            <DashBoard />
          </Content>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
