import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { Usuario } from '../interfaces/Usuario';

interface IStore {
  isFetching: boolean;
  setLoadingOn: () => void;
  setLoadingOff: () => void;
  isMutating: boolean;
  setMutatingOn: () => void;
  setMutatingOff: () => void;
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario) => void;
  isSidebarOpen: boolean;
  existSidebar: boolean;
  setExistSidebar: (exist: boolean) => void;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  swSubscription: PushSubscription | null;
  setSwSubscription: (sub: PushSubscription) => void;
}

const useStore = create(
  subscribeWithSelector<IStore>((set) => ({
    isFetching: false,
    setLoadingOn: () => set({ isFetching: true }),
    setLoadingOff: () => set({ isFetching: false }),
    isMutating: false,
    setMutatingOn: () => set({ isMutating: true }),
    setMutatingOff: () => set({ isMutating: false }),
    usuario: null,
    setUsuario: (usuario: Usuario) => set({ usuario }),
    isSidebarOpen: false,
    setIsSidebarOpen: (open: boolean) => set({ isSidebarOpen: open }),
    toggleSidebar: () =>
      set(({ isSidebarOpen, existSidebar }) => {
        if (existSidebar) return { isSidebarOpen: !isSidebarOpen };
        return {};
      }),
    existSidebar: false,
    setExistSidebar: (existSidebar) => set({ existSidebar }),
    swSubscription: null,
    setSwSubscription: (swSubscription) => set({ swSubscription }),
  }))
);

export default useStore;
