import React from 'react';
import ReactDOM from 'react-dom';

import { ClaimTokensModal } from './ClaimTokensModal';
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

export const openClaimTokensModal = (message: string) => {
  attachDiv();
  ReactDOM.render(
    <ClaimTokensModal closeModal={detachDiv} message={message} />,
    stackOfModalDivs[stackOfModalDivs.length - 1],
  );
};

export const openWalletModal = (changeWallet: any) => {
  attachDiv();
  ReactDOM.render(
    <WalletModal closeModal={detachDiv} changeWallet={changeWallet} />,
    stackOfModalDivs[stackOfModalDivs.length - 1],
  );
};