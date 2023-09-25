import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

interface IStore {
  isFetching: boolean;
  setLoadingOn: () => void;
  setLoadingOff: () => void;
  isMutating: boolean;
  setMutatingOn: () => void;
  setMutatingOff: () => void;
}

const useStore = create(
  subscribeWithSelector<IStore>((set) => ({
    isFetching: false,
    setLoadingOn: () => set({ isFetching: true }),
    setLoadingOff: () => set({ isFetching: false }),
    isMutating: false,
    setMutatingOn: () => set({ isMutating: true }),
    setMutatingOff: () => set({ isMutating: false }),
  }))
);

export default useStore;
