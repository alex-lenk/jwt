import { createContext, useContext } from 'react';
import NetworkStore from './networkStore';

export class rootStore {
  networkStore: NetworkStore;

  constructor() {
    this.networkStore = new NetworkStore();
  }
}

export const rootStores = new rootStore();

export const StoreProvider = createContext(rootStores).Provider;

export const useStores = () => useContext(createContext(rootStores));
