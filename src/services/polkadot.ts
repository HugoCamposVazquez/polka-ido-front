import { ApiPromise, HttpProvider } from '@polkadot/api';

// initialise via static create
export const getStatemintApi = async (): Promise<ApiPromise> => {
  if (!process.env.REACT_APP_STATEMINT_URL) {
    throw new Error('Statemint URL not set in the environment.');
  }

  const provider = new HttpProvider(process.env.REACT_APP_STATEMINT_URL);
  return await ApiPromise.create({ provider });
};