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
type State = {
  // id?: number;
  isLoggedIn: boolean | undefined;
  userInfo: Prop;
  posts: Post[];
  // token: string | undefined;
  // email: string | undefined;
  // value: Prop;

  // title: string | undefined;
  // content: string | undefined;
  // file: any;
  // category: string | undefined;
};

const initialState: State = {
  // id: undefined,
  isLoggedIn: false,
  userInfo: { email: "", fullName: "", token: "", id: undefined },
  posts: [],
  // token: undefined,
  // email: undefined,
  // email: undefined,
  // title: undefined,
  // content: undefined,
  // file: undefined,
  // category: undefined,
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

  const { isLoggedIn } = state;

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
    //@ts-ignore
    dispatch({
      type: "logged in",
      token: token,
    });
  }, []);

  const handleReload = useCallback(() => {
    const token = localStorage.getItem("token");
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
          //@ts-ignore
          dispatch({
            type: "initial data",
            payload: Userpost,
          });
          //@ts-ignore
          dispatch({ type: "logged in", payload: Userdata });
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    handleReload();
  }, [handleReload]);

  const login = useCallback((prop: Prop) => {
    console.log(prop);
    let { token, email } = prop;
    console.log(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    //@ts-ignore
    dispatch({ type: "logged in", payload: { ...prop } });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    //@ts-ignore
    dispatch({
      type: "logged out",
      payload: { email: undefined, token: undefined },
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

function reducer(state: State, action: Action) {
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
      return { ...action.payload, isLoggedIn: false };
      break;
    case "post created":
      // const newPost: any = [state.posts];
      // newPost.push(action.payload.data);
      // state.posts = newPost;
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
