import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Style";
import { CoinHeaderGridStyle } from "../Settings/CoinHeaderGrid";
import { AppContext } from "../App/AppProvider";

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

function ChangePercentage({ data }) {
  return (
    <JustifyRight>
      <ChangePCT red={data.CHANGEPCT24HOUR < 0}>
        {numberFormat(data.CHANGEPCT24HOUR)}
      </ChangePCT>
    </JustifyRight>
  );
}

function PriceTile({ sym, data, currentFavorites, setCurrentFavourite }) {
  return (
    <PriceTileStyled
      onClick={setCurrentFavourite}
      currentFavorites={currentFavorites}
    >
      <CoinHeaderGridStyle>
        <div>{sym}</div>
        <ChangePercentage data={data} />
      </CoinHeaderGridStyle>
      <TickerPrice>{numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
}

function PriceTileCompact({
  sym,
  data,
  currentFavorites,
  setCurrentFavourite
}) {
  return (
    <PriceTileStyled
      compact
      onClick={setCurrentFavourite}
      currentFavorites={currentFavorites}
    >
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
  return (
    <AppContext.Consumer>
      {({ currentFavorites, setCurrentFavourite }) => (
        <TileClass
          sym={sym}
          data={data}
          currentFavorites={currentFavorites === sym}
          setCurrentFavourite={() => setCurrentFavourite(sym)}
        />
      )}
    </AppContext.Consumer>
  );
}

const ChangePCT = styled.div`
  color: green;
  ${props =>
    props.red &&
    css`
      color: red;
    `}
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

  ${props =>
    props.currentFavorites &&
    css`
      ${greenBoxShadow};
      pointer-events: none;
    `}
`;
