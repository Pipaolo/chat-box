import { reactive } from "vue";
import IO from "socket.io-client";
import { useAuthentication } from "./authentication";

const state = reactive({
  socket: {},
});

export const useSocketEmit = (name, payload) => {
  state.socket.emit(name, payload);
};
export const useSocketOn = (name, eventHandler) => {
  state.socket.on(name, eventHandler);
};

export const useSocketClose = () => {
  state.socket.close();
  state.socket = {};
};

export const connect = async () => {
  const socket = IO(
    import.meta.env.MODE === "production"
      ? `https://${import.meta.env.VITE_SERVER_URL}`
      : `http://${import.meta.env.VITE_SERVER_URL}:${
          import.meta.env.VITE_SERVER_PORT
        }`,
    {
      path: "/chat-box/rooms/",
      transports: ["websocket"],
    }
  );
  state.socket = socket;
};

export const useSocket = () => state;
