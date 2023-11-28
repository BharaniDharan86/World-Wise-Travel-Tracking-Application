/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const GlobalContext = createContext();

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

export function FakeUserContext({ children }) {
  const initialState = {
    user: null,
    isAuth: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "login":
        return { ...state, user: action.payload, isAuth: true };
      case "logout":
        return { ...state, user: null, isAuth: false };
      default:
        throw new Error("Unknown action");
    }
  }

  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialState);

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <GlobalContext.Provider
      value={{
        login,
        logout,
        user,
        isAuth,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(GlobalContext);
  return context;
}