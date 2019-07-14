import React from "react";
import styled from "styled-components";

export const CoinHeaderGridStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const CoinSymbol = styled.div`
  justify-self: right;
`;

export default function({ name, symbol }) {
  return (
    <CoinHeaderGridStyle>
      <div>{name}</div>
      <CoinSymbol>{symbol}</CoinSymbol>
    </CoinHeaderGridStyle>
  );
}
