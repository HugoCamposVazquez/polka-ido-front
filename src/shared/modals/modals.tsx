import { SaleContract } from '@nodefactoryio/ryu-contracts/typechain/SaleContract';
import React from 'react';
import ReactDOM from 'react-dom';

import { ClaimTokensModal } from './ClaimTokensModal';
import { UnsupportedNetwork } from './UnsupportedNetwork';
import { WalletModal } from './WalletModal';

const stackOfModalDivs: HTMLDivElement[] = [];

const attachDiv = () => {
  if (stackOfModalDivs.length === 0) {
    document.body.style.overflow = 'hidden';
  }

  const div = document.createElement('div');

  div.style.position = 'fixed';
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.zIndex = '2000';

  stackOfModalDivs.push(div);
  document.body.appendChild(div);
};

const detachDiv = () => {
  const div = stackOfModalDivs.pop();

  if (div) {
    ReactDOM.unmountComponentAtNode(div);
    div.parentNode?.removeChild(div);

    if (stackOfModalDivs.length === 0) {
      document.body.style.overflow = 'auto';
    }
  }
};

export const openClaimTokensModal = (id: string, contract: SaleContract, userEthAddress: string, tokenId?: string) => {
  attachDiv();
  ReactDOM.render(
    <ClaimTokensModal
      closeModal={detachDiv}
      id={id}
      contract={contract}
      userEthAddress={userEthAddress}
      tokenId={tokenId}
    />,
    stackOfModalDivs[stackOfModalDivs.length - 1],
  );
};

export const openWalletModal = (changeWallet: any, account: string) => {
  attachDiv();
  ReactDOM.render(
    <WalletModal closeModal={detachDiv} account={account} />,
    stackOfModalDivs[stackOfModalDivs.length - 1],
  );
};

export const openUnsupportedNetworkModal = (onClose: (declined?: boolean) => void) => {
  const handleClose = (declined?: boolean) => {
    detachDiv();
    onClose(declined);
  };

  attachDiv();
  ReactDOM.render(<UnsupportedNetwork closeModal={handleClose} />, stackOfModalDivs[stackOfModalDivs.length - 1]);
};
