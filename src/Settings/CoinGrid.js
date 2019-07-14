import React from "react";
import styled from "styled-components";
import { AppContext } from "../App/AppProvider";

export const CoinGridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;

export default function() {
  return (
    <AppContext.Consumer>
      {({ coinList }) => (
        <CoinGridStyle>
          {Object.keys(coinList).map(coinKey => (
            <div> {coinKey} </div>
          ))}
        </CoinGridStyle>
      )}
    </AppContext.Consumer>
  );
}
