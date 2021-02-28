import React from 'react';
import styled from 'styled-components';

import { useWallet } from 'use-wallet';

import useModal from '../../../hooks/useModal';

import Button from '../../Button';

import AccountModal from './AccountModal';

import buttonA from '../../../assets/img/buttonA.png';

interface AccountButtonProps {}

const AccountButton: React.FC<AccountButtonProps> = (props) => {
  const [onPresentAccountModal] = useModal(<AccountModal />)

  const { account, connect } = useWallet()

  return (
    <StyledAccountButton >
      {!account ? (
        <Button
          onClick={() => connect('injected')}
          size="sm"
          text="I know it's BETA and Unlock Wallet"
          variant={'tertiary'}
        />
      ) : (
        <Button
          onClick={onPresentAccountModal}
          size="sm"
          text="My Wallet"
          variant={'tertiary'}
        />
      )}
    </StyledAccountButton>
  )
}

const StyledAccountButton = styled.div`
  background-image: url(${buttonA});
  background-repeat : no-repeat;
  background-size: 100% 100%;
`

export default AccountButton
