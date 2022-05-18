import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Post } from "./definition";
type State = {
  isLoggedIn: boolean | undefined;
  token: string | undefined;
  email: string | undefined;
  posts: Post[];
  title: string | undefined;
  content: string | undefined;
  file: any;
  category: string | undefined;
};

const initialState: State = {
  isLoggedIn: false,
  token: undefined,
  email: undefined,
  posts: [],
  title: undefined,
  content: undefined,
  file: undefined,
  category: undefined,
};

type ContextType = State & {
  login: ({}: { email: string; token: string }) => void;
  logout: () => void;
  dispatch: React.Dispatch<Action>;
};

const initialValue: ContextType = {
  ...initialState,
  login: () => {},
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
    const token = localStorage.getItem("token");
    const localEmail = localStorage.getItem("email");

    if (!token || token === undefined) {
      return;
    }
    if (!localEmail || localEmail === undefined) {
      return;
    }

    dispatch({ type: "logged in", email: localEmail, token: token });
  }, []);

  const login = useCallback(
    ({ token, email }: { token: string; email: string }) => {
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      dispatch({ type: "logged in", email: email, token });
    },
    []
  );
  const logout = useCallback(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    dispatch({ type: "logged out" });
  }, []);

  const value = useMemo(() => {
    state, login, logout, dispatch;
  }, [login, logout, state]);

  return (
    <AppContext.Provider value={{ state, login, logout, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

type Action =
  | { type: "logged in"; email: string; token: string }
  | { type: "logged out" }
  | {
      type: "post created";
      post: Post;
      title: string;
      content: string;
      file: any;
      category: string;
    };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "logged in":
      return {
        email: action.email,
        token: action.token,
        isLoggedIn: true,
      };
      break;

    case "logged out":
      return {
        email: undefined,
        token: undefined,
        isLoggedIn: false,
      };
      break;

    case "post created":
      return [
        {
          title: action.title,
          content: action.content,
          category: action.category,
          file: action.file,
        },
      ];
      break;

    default:
      return state;
  }
}

export const useAppContext = () => {
  return useContext(AppContext);
};
