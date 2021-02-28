import React from "react";
import styled from 'styled-components';

const StyledBetaWarning = styled.div`
background: #fbdf15;
border-radius: 2px;
border-color: #a9a924;
`;

const BetaWarning = () => <StyledBetaWarning className="beta-warning">
        <h2 className="title"> Do Not YOLO a BETA version </h2>
        <p>By Pressing the "Unlock Wallet" button, you're aware of that YSD is currently in <b>BETA</b>.</p>
        <p> DO NOT deposit LARGE amounts of Coins as bugs are unknown. </p>
</StyledBetaWarning>


export default BetaWarning;