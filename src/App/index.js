import React, { Component } from "react";
import WelcomeMessage from "./welcomeMessage";
import styled from "styled-components";
import "./App.css";

const MyDiv = styled.div`
  color: white;
`;

class App extends Component {
  render() {
    return (
      <MyDiv>
        <WelcomeMessage />
      </MyDiv>
    );
  }
}

export default App;
