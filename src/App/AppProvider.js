import React, { Component, createContext } from "react";
import _ from "lodash";
import moment from "moment";

const cc = require("cryptocompare");

const MAX_FAVORITES = 10;
const TIME_UNITS = 10;

export const AppContext = createContext();

class AppProvider extends Component {
  constructor() {
    super();
    this.state = {
      page: "dashboard",
      favorites: ["BTC", "ETH", "XMR", "DOGE"],
      timeInterval: "months",
      ...this.savedSettings(),
      setPage: page => this.setState({ page }),
      setFilteredCoins: filteredCoins => this.setState({ filteredCoins }),
      addCoin: this.addCoin,
      removeCoin: this.removeCoin,
      isInFavorites: this.isInFavorites,
      setCurrentFavourite: this.setCurrentFavourite,
      // setFilteredCoins: this.setFilteredCoins,
      confirmFavorites: this.confirmFavorites,
      chargeChangeSelect: this.chargeChangeSelect
    };
  }

  componentDidMount() {
    this.fetchCoins();
    this.fetchPrices();
    this.fetchHistorical();
  }

  fetchCoins = async () => {
    let coinList = (await cc.coinList()).Data;
    this.setState({ coinList });
    // console.log(coinList);
  };

  fetchPrices = async () => {
    if (this.state.firstVisit) return;
    let prices = await this.prices();
    // console.log(prices);
    prices = prices.filter(price => Object.keys(price).length);
    // console.log(prices);
    this.setState({ prices });
    console.log(prices);
  };

  fetchHistorical = async () => {
    if (this.state.firstVisit) return;
    let results = await this.historical();
    let historical = [
      {
        name: this.state.currentFavorites,
        data: results.map((result, index) => [
          moment()
            .subtract({ [this.state.timeInterval]: TIME_UNITS - index })
            .valueOf(),
          result.USD
        ])
      }
    ];
    this.setState({ historical });
  };

  prices = async () => {
    let returnData = [];
    for (let i = 0; i < this.state.favorites.length; i++) {
      try {
        let priceData = await cc.priceFull(this.state.favorites[i], "USD");
        returnData.push(priceData);
        // console.log("return data" + returnData);
      } catch (e) {
        console.warn("Fetch Price Error: ", e);
      }
    }
    return returnData;
  };

  historical = () => {
    let promises = [];
    for (let units = TIME_UNITS; units > 0; units--) {
      promises.push(
        cc.priceHistorical(
          this.state.currentFavorites,
          ["USD"],
          moment()
            .subtract({ [this.state.timeInterval]: units })
            .toDate()
        )
      );
    }
    return Promise.all(promises);
  };

  addCoin = key => {
    let favorites = [...this.state.favorites];
    if (favorites.length < MAX_FAVORITES) {
      favorites.push(key);
      this.setState({ favorites });
    }
  };

  removeCoin = key => {
    let favorites = [...this.state.favorites];
    this.setState({ favorites: _.pull(favorites, key) });
  };

  isInFavorites = key => _.includes(this.state.favorites, key);

  confirmFavorites = () => {
    // console.log("Hello!");
    let currentFavorites = this.state.favorites[0];
    this.setState(
      {
        firstVisit: false,
        page: "dashboard",
        currentFavorites,
        prices: null,
        historical: null
      },
      () => {
        this.fetchPrices();
        this.fetchHistorical();
      }
    );
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        favorites: this.state.favorites,
        currentFavorites
      })
    );
  };

  setCurrentFavourite = sym => {
    this.setState(
      { currentFavorites: sym, historical: null },
      this.fetchHistorical
    );
    localStorage.setItem(
      "cryptoDash",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("cryptoDash")),
        currentFavorites: sym
      })
    );
  };

  savedSettings() {
    let cryptoDashData = JSON.parse(localStorage.getItem("cryptoDash"));
    if (!cryptoDashData) {
      return { page: "settings", firstVisit: true };
    }
    let { favorites, currentFavorites } = cryptoDashData;
    return { favorites, currentFavorites };
  }

  chargeChangeSelect = value => {
    // console.log(value);
    this.setState(
      { timeInterval: value, historical: null },
      this.fetchHistorical
    );
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
