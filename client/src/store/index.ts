import { createContext, useContext } from 'react';
import NetworkStore from './networkStore';

export class rootStore {
  networkStore: NetworkStore;

  constructor() {
    this.networkStore = new NetworkStore();
  }
}

export const rootStores = new rootStore();

const StoreContext = createContext(rootStores);

export const StoreProvider = StoreContext.Provider;

export const useStores = () => useContext(StoreContext);
