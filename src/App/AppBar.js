import React from "react";
import styled from "styled-components";

const Bar = styled.div`
  display: grid;
  grid-template-columns: 180px auto repeat(2, 100px);
`;

export default function() {
  return (
    <Bar>
      <div>CrptoBoard</div>
      <div />
      <div>Dashboard</div>
      <div>Settings</div>
    </Bar>
  );
}
