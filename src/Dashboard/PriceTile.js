import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig } from "../Shared/Style";
import { CoinHeaderGridStyle } from "../Settings/CoinHeaderGrid";

const numberFormat = number => {
  return +(number + "").slice(0, 7);
};

const TickerPrice = styled.div`
  ${fontSizeBig}
`;

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const PriceTileStyled = styled(SelectableTile)`
  ${props =>
    props.compact &&
    css`
      ${fontSize3};
      display: grid;
      grid-gap: 5px;
      justify-items: right;
      grid-template-columns: repeat(3, 1fr);
    `}
`;

function ChangePercentage({ data }) {
  return (
    <JustifyRight>
      <ChangePCT red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}
      </ChangePCT>
    </JustifyRight>
  );
}

function PriceTile({ sym, data }) {
  return (
    <PriceTileStyled>
      <CoinHeaderGridStyle>
        <div>{sym}</div>
        <ChangePercentage data={data} />
      </CoinHeaderGridStyle>
      <TickerPrice>{numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
}

function PriceTileCompact({ sym, data }) {
  return (
    <PriceTileStyled compact>
      <JustifyLeft>{sym}</JustifyLeft>
      <ChangePercentage data={data} />
      <div>{numberFormat(data.PRICE)}</div>
    </PriceTileStyled>
  );
}

export default function({ price, index }) {
  let sym = Object.keys(price)[0];
  let data = price[sym]["USD"];
  let TileClass = index < 5 ? PriceTile : PriceTileCompact;
  return <TileClass sym={sym} data={data} />;
}

const ChangePCT = styled.div`
  color: green;
  ${props =>
    props.red &&
    css`
      color: red;
    `}
`;
