import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { config } from "./Api";
import { Post, Prop } from "./definition";

interface State {
  isLoggedIn: boolean | undefined;
  userInfo: Prop;
  posts: Post[];
}

const initialState: State = {
  isLoggedIn: false,
  userInfo: { email: "", fullName: "", token: "", id: undefined },
  posts: [],
};

type ContextType = State & {
  login: (prop: Prop) => void;
  logout: () => void;
  dispatch: (value: Action) => void;
};

const initialValue: ContextType = {
  ...initialState,
  login: async (prop: Prop) => {},
  logout: () => {},
  dispatch: () => {},
};

export const AppContext: React.Context<ContextType> =
  createContext<ContextType>(initialValue);

export const AppmanagerContext = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  // const [state, dispatch] = useReducer<State, Action>(reducer, initialState);

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    const token: any = localStorage.getItem("token");
    const localEmail: any = localStorage.getItem("email");
    console.log("token:", token);
    if (!token || typeof token === "undefined") {
      return;
    }
    if (!localEmail || typeof localEmail === "undefined") {
      return;
    }
    // dispatch({
    //   type: "logged in",
    //   token: token,
    // });
  }, []);

  const handleReload = useCallback((): void => {
    const token: any = localStorage.getItem("token");
    const localEmail: any = localStorage.getItem("email");

    axios
      .post(
        `${config.apiUrl}/api/data/userValid`,
        {},

        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((result) => {
        console.log(result);
        if ((result.status as number) == 200) {
          const Userdata = result?.data.user;
          const Userpost = result?.data?.post;
          dispatch({
            type: "initial data",
            payload: Userpost,
          });
          dispatch({ type: "logged in", payload: Userdata });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handleReload();
  }, [handleReload]);

  const login = useCallback((prop: Prop): void => {
    console.log(prop);
    let { token, email } = prop;
    console.log(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    dispatch({ type: "logged in", payload: { ...prop } });
  }, []);

  const logout = useCallback((): void => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    // dispatch({
    //   type: "logged out",
    //   payload: { email: undefined, token: undefined },
    // });
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

  const value = {
    login,
    logout,
    dispatch,
    state,
  };

  return (
    <AppContext.Provider
      value={{
        login,
        logout,
        dispatch,
        state,
      }}
    >
      {children}
    </AppContext.Provider>
  );
  // return {
  //   ...state,
  //   dispatch,
  //   login,
  //   logout,
  // };
};

type Action =
  | { type: "logged in"; payload: Prop }
  | { type: "logged out"; payload: {} }
  | { type: "post created"; payload: Post }
  | { type: "initial data"; payload: Post[] }
  | { type: "post deleted"; payload: any }
  | { type: "post edited"; payload: Post };

function reducer<T>(state: State = initialState, action: Action): State {
  switch (action.type) {
    case "logged in":
      return {
        ...state,
        isLoggedIn: true,
        userInfo: {
          ...action.payload,
        },

        // isLoggedIn: action.isLoggedIn,
      };
      break;
    case "logged out":
      return { ...state, ...action.payload, isLoggedIn: false };
      break;
    case "post created":
      const updatepost = [...state.posts, { ...action.payload }];
      console.log({
        ...state,
        isLoggedIn: true,
        posts: updatepost,
      });
      return {
        ...state,
        isLoggedIn: true,
        posts: updatepost,
      };
      break;
    case "initial data":
      console.log("initial data", { posts: action.payload });
      return {
        ...state,
        isLoggedIn: true,
        posts: action.payload,
      };
      break;
    case "post deleted":
      let index: any = state.posts.findIndex((ps) => ps.id == action.payload);
      return {
        ...state,
        isLoggedIn: true,
        posts: state.posts.filter((post) => post.id !== action.payload),
      };
      break;
    case "post edited":
      // find index
      const postId = state.posts.findIndex(
        (post) => post.id === action.payload.id
      );
      //update posts
      const editPost = [...state.posts, (state.posts[postId] = action.payload)];

      return {
        ...state,
        isLoggedIn: true,
        posts: editPost,
      };
      break;

    default:
      return state;
  }
}

export const useAppContext = () => {
  return useContext(AppContext);
};
