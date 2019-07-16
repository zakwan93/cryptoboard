import React from "react";
import styled, { css } from "styled-components";

export default function({ coin, spotlight }) {
  return (
    <CoinImage
      spotlight={spotlight}
      alt={coin.CoinSymbol}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
    />
  );
}

const CoinImage = styled.img`
  height: 50px;
  ${props =>
    props.spotlight &&
    css`
      height: 200px;
      display: block;
      margin: auto;
    `}
`;
