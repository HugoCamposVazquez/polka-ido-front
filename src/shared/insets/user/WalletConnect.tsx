import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import React, { useMemo } from 'react';

import { injected } from '../../../hooks/web3/connectors';
import { onLogin } from '../../../hooks/web3/useEagerConnect';
import { useMoonbeanBalance } from '../../../hooks/web3/useMoonbeamBalance';
import { cs } from '../../../utils/css';
import { formatWei } from '../../../utils/numModifiyngFuncs';
import { MainButton } from '../../gui/MainButton';
import { openUnsupportedNetworkModal, openWalletModal } from '../../modals/modals';
import * as styles from './WalletConnect.styles';

interface WalletConnectProps {
  isMobile?: boolean;
}

export const WalletConnect = ({ isMobile }: WalletConnectProps) => {
  const { account, activate } = useWeb3React();
  const onWalletChange = () => {
    alert('Not sure yet what this should do');
  };

  const onConnect = async () => {
    await activate(injected, (error) => {
      if (error instanceof UnsupportedChainIdError) {
        openUnsupportedNetworkModal();
      }
    });
    onLogin();
  };

  const { balance } = useMoonbeanBalance();
  const formattedBalance = useMemo(() => formatWei(balance), [balance]);

  return (
    <>
      {!account && (
        <MainButton
          title={'CONNECT WALLET'}
          type={'fill'}
          onClick={onConnect}
          style={isMobile ? {} : { marginLeft: '0.375rem' }}
        />
      )}
      {account && (
        <div
          style={cs(styles.connectWalletContainerStyle, isMobile ? { marginLeft: 0 } : {})}
          onClick={() => {
            openWalletModal(onWalletChange);
          }}>
          <div style={styles.balanceStyle}>{formattedBalance} MOVR</div>
          <div style={styles.addressContainerStyle}>
            <div style={styles.addressStyle}>
              {account.slice(0, 6)}...{account.slice(-4)}
            </div>
          </div>
        </div>
      )}
    </>
  );
};