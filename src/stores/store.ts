import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface IStore {
  isLoading: boolean,
  setLoadingOn: () => void,
  setLoadingOff: () => void,
}

const useStore = create(subscribeWithSelector<IStore>((set) => ({
  isLoading: false,
  setLoadingOn: () => set({ isLoading: true }),
  setLoadingOff: () => set({ isLoading: false }),
})));

export default useStore;
