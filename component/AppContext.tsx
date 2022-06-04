import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Post, Prop } from "./definition";
type State = {
  id?: number;
  isLoggedIn: boolean | undefined;
  token: string | undefined;
  email: string | undefined;
  value: Prop;
  posts: Post[];
  title: string | undefined;
  content: string | undefined;
  file: any;
  category: string | undefined;
};

const initialState: State = {
  id: undefined,
  isLoggedIn: false,
  token: undefined,
  email: undefined,
  posts: [],
  title: undefined,
  content: undefined,
  file: undefined,
  category: undefined,
  value: {},
};

type ContextType = State & {
  login: ({}) => void;
  logout: () => void;
  dispatch: React.Dispatch<Action>;
  state: any;
};

const initialValue: ContextType = {
  ...initialState,
  login: ({}) => {},
  logout: () => {},
  dispatch: () => {},
};

export const AppContext = createContext<ContextType>(initialValue);

export const AppmanagerContext = (
  // props: any,
  {
    children,
  }: {
    children: React.ReactNode;
  }
) => {
  //@ts-ignore
  const [state, dispatch] = useReducer<State, Action>(reducer, initialState);
  useEffect(() => {
    console.log(state);
  }, [state]);
  console.log(state);
  const { isLoggedIn } = state;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const localEmail = localStorage.getItem("email");
    console.log("token:", token);
    if (!token || typeof token === "undefined") {
      return;
    }
    if (!localEmail || typeof localEmail === "undefined") {
      return;
    }
    //@ts-ignore
    // dispatch({
    //   type: "logged in",
    //   payload: { email: localEmail, token: token ,isLoggedIn: true },
    // });
  }, []);

  const login = useCallback((prop: Prop) => {
    console.log(prop);
    let { token, email } = prop;
    console.log(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    //@ts-ignore
    dispatch({ type: "logged in", payload: { ...prop }, isLoggedIn: true });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    //@ts-ignore

    dispatch({
      type: "logged out",
      payload: { email: undefined, token: undefined, isLoggedIn: false },
    });
  }, []);

  const contextvalue = useMemo(
    () => ({
      logout,
      login,
      dispatch,
      state,
    }),
    [login, logout, state]
  );

  return (
    <AppContext.Provider value={{ login, logout, dispatch, state }}>
      {children}
    </AppContext.Provider>
  );
};

type Action =
  | { type: "logged in"; payload: Prop; isLoggedIn: boolean }
  | { type: "logged out"; payload: {}; isLoggedIn: boolean }
  | {
      type: "post created";
      payload: {};
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "logged in":
      return {
        ...action.payload,
        LoggedIn: action.isLoggedIn,
      };
      break;

    case "logged out":
      return { ...action.payload };
      break;

    case "post created":
      return;
      {
      }
      break;

    default:
      return state;
  }
}

export const useAppContext = () => {
  return useContext(AppContext);
};
