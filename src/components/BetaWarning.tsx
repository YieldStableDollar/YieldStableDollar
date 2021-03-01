import React from "react";
import styled from 'styled-components';

const StyledBetaWarning = styled.div`
  background: #fbdf15;
  border-radius: 2px;
  font-size: 20px;
  border-color: #a9a924;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  @media (max-width: 768px) {
    &:h2 {
      font-size: 20px;
    }
    font-size: 14px;
  }
`;

const BetaWarning = () => (
  <StyledBetaWarning className="beta-warning">
    <h2 className="title"> Do Not YOLO a BETA version 这是一个测试版本 </h2>
    <p>By Pressing the "Unlock Wallet" button, you're aware of that YSD is currently in <b>BETA</b>.</p>
    <p> DO NOT deposit LARGE amounts of Coins as bugs are unknown. </p>
    <p><b>请不要充值大额资产，不要提供大额的流动性。这是一个测试版本。</b></p>
    <p> 提供流动性会有损失风险，请慎重考虑。</p>
  </StyledBetaWarning>
)


export default BetaWarning;