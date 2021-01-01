import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Bank from '../Bank';
import BankCards from './BankCards';
import { useWallet } from 'use-wallet';
import Button from '../../components/Button';
import styled from 'styled-components';
import bankimg from '../../assets/img/bank.png';
import PickaBank from '../../assets/img/PickaBank.png';
import line from '../../assets/img/line.png';
import buttonA from '../../assets/img/buttonA.png';

const Banks: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();

  return (
    <Switch>
      <Page>
        <Route exact path={path}>
          <PageHeader
            icon={bankimg}
            titleLeft={PickaBank}
            titleRight={line}
            title="Pick a Bank."
            subtitle="Earn Basis Shares by providing liquidity"
          />
          {!!account ? (
            <BankCards />
          ) : (
            <Center>
              <StyledBtn>
                <Button variant={'tertiary'} onClick={() => connect('injected')} text="Unlock Wallet"/>
              </StyledBtn>
            </Center>
          )}
        </Route>
        <Route path={`${path}/:bankId`}>
          <Bank />
        </Route>
      </Page>
    </Switch>
  );
};

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledBtn = styled.div`
  background-image: url(${buttonA});
  background-repeat : no-repeat;
  background-size: 100% 100%;
  padding: 0 30px;
`;

export default Banks;
