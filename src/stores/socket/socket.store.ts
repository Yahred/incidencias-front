import { Socket, io } from 'socket.io-client';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { Usuario } from '../../interfaces';

const { VITE_SOCKET_URL } = import.meta.env;

interface SocketStore {
  socket: Socket | null;
  conectarSocket: (usuario: Usuario) => void;
}

const useSocketStore = create(
  subscribeWithSelector<SocketStore>((set) => ({
    socket: null,
    conectarSocket: (usuario: Usuario) => {
      set(({ socket }) => {
        if (socket) return {};
        const conexion = io(VITE_SOCKET_URL, {
          secure: true,
          query: {
            usuarioId: usuario?.id,
          },
        });
        return { socket: conexion };
      });
    },
  }))
);

export default useSocketStore;
