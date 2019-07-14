import React, { Component, createContext } from "react";

export const AppContext = createContext();

class AppProvider extends Component {
  constructor() {
    super();
    this.state = {
      page: "dashboard",
      ...this.savedSettings(),
      setPage: page => this.setState({ page }),
      confirmFavorites: this.confirmFavorites
    };
  }

  confirmFavorites = () => {
    // console.log("Hello!");
    this.setState({
      firstVisit: false,
      page: "dashboard"
    });
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        test: "hello"
      })
    );
  };

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptodash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    return {};
  }

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
