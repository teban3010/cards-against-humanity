import React, { useCallback, useState } from 'react';

import { io } from 'socket.io-client';

export const SocketContext = React.createContext({
  socket: io(process.env.NEXT_PUBLIC_API),
  subscribe: (_eventName, _handler) => {},
  unSubscribe: (_eventName, _handler) => {},
});

const SocketProvider = (props) => {
  const [socket] = useState(io(process.env.NEXT_PUBLIC_API));

  const subscribeHandler = useCallback(
    (eventName, handler) => {
      socket.on(eventName, handler);
    },
    [socket]
  );

  const unSubscribeHandler = useCallback(
    (eventName, handler) => {
      socket.off(eventName, handler);
    },
    [socket]
  );

  return (
    <SocketContext.Provider
      value={{
        subscribe: subscribeHandler,
        unSubscribe: unSubscribeHandler,
        socket,
      }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
