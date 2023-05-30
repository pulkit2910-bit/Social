import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import {io} from "socket.io-client"

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

const socket = io("ws://localhost:9000");
const AuthContext = createContext(INITIAL_STATE);

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        socket: socket,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthContextProvider};