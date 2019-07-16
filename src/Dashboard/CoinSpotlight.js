import React from "react";
import styled from "styled-components";
import { Tile } from "../Shared/Tile";
import CoinImage from "../Shared/CoinImage";
import { AppContext } from "../App/AppProvider";

const SpotlightName = styled.h2`
  text-align: center;
`;

export default function() {
  return (
    <AppContext.Consumer>
      {({ currentFavorites, coinList }) => (
        <Tile>
          <SpotlightName>{coinList[currentFavorites].CoinName}</SpotlightName>
          <CoinImage spotlight coin={coinList[currentFavorites]} />
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
