import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";
import CoinTile from "./CoinTile";

export const CoinGridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  margin: 0 auto;
  grid-gap: 15px;
  margin: 40px 0;
`;

function getLowerSectionCoins(coinList, filteredCoins) {
  return (
    (filteredCoins && Object.keys(filteredCoins)) ||
    Object.keys(coinList).slice(0, 100)
  );
}

const getCoinToDisplay = (coinList, topSection, favorites, filterCoins) => {
  return topSection ? favorites : getLowerSectionCoins(coinList, filterCoins);
};

export default function({ topSection }) {
  return (
    <AppContext.Consumer>
      {({ coinList, favorites, filteredCoins }) => (
        <CoinGridStyle>
          {getCoinToDisplay(coinList, topSection, favorites, filteredCoins).map(
            coinKey => (
              <CoinTile
                key={coinKey}
                topSection={topSection}
                coinKey={coinKey}
              />
            )
          )}
        </CoinGridStyle>
      )}
    </AppContext.Consumer>
  );
}
