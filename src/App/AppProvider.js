import React, { Component, createContext } from "react";

export const AppContext = createContext();

class AppProvider extends Component {
  state = {
    page: "settings",
    setPage: page => this.setState({ page })
  };

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
