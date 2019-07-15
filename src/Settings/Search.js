import React from "react";
import styled from "styled-components";
import { backgroundColor2, fontSize2 } from "../Shared/Style";
import { AppContext } from "../App/AppProvider";
import _ from "lodash";
import fuzzy from "fuzzy";

const SearchGrid = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const SearchInput = styled.input`
  ${backgroundColor2};
  ${fontSize2};
  border: 1px solid;
  height: 25px;
  color: #1163c9;
  place-self: center left;
`;

const handleFilter = _.debounce((inputValue, coinList, setFilterCoins) => {
  //   console.log(inputValue);
  // 1. Get All the coin symbols
  let coinSymbols = Object.keys(coinList);
  //   console.log(coinSymbols);
  // 2. Get all coin names, map symbol to name
  let coinNames = coinSymbols.map(symbol => coinList[symbol].CoinName);
  //   console.log(coinNames);
  // 3. Combine coinSymbol and coinNames
  let allStringToSearch = coinSymbols.concat(coinNames);
  //   console.log(allStringToSearch);
  let fuzzySearch = fuzzy
    .filter(inputValue, allStringToSearch, {})
    .map(result => result.string);

  let filterdCoins = _.pickBy(coinList, (result, symKey) => {
    let coinName = result.CoinName;
    return _.includes(fuzzySearch, symKey) || _.includes(fuzzySearch, coinName);
  });
  console.log(filterdCoins);

  console.log(setFilterCoins(filterdCoins));
}, 500);

function filterCoins(e, setFilteredCoins, coinList) {
  let inputValue = e.target.value;
  if (!inputValue) {
    setFilteredCoins(null);
    return;
  }
  handleFilter(inputValue, coinList, setFilteredCoins);
}

export default function() {
  return (
    <AppContext.Consumer>
      {({ setFilteredCoins, coinList }) => (
        <SearchGrid>
          <div>Search Coins</div>
          <SearchInput
            onKeyUp={e => filterCoins(e, setFilteredCoins, coinList)}
          />
        </SearchGrid>
      )}
    </AppContext.Consumer>
  );
}
