import axios from "axios";

export const config = {
  apiUrl: "http://localhost:7000",
};

export const SendPostrequest = async ({
  url,
  data,
  token,
}: {
  url: string;
  data: object;
  token: string;
}) => {
  axios.post(
    `http://localhost:7000/${url}`,
    { data },
    { headers: { token: token } }
  );
};

export const Login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email && !password) {
    return;
  }

  return axios.post(`${config.apiUrl}/api/user/login`, { email, password });
};

export const Verification = ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  if (!email || !password || !name) {
    return;
  }
  return axios.post(`${config.apiUrl}/api/user/auth`, {
    name,
    email,
    password,
  });
};

export const createPost = async ({
  post,
  token,
}: {
  post: any;
  token: string | undefined;
}) => {
  if (!post || !token) {
    return;
  }

  return await axios
    .post(
      `${config.apiUrl}/api/data/add-post`,
      {
        post,
      },
      {
        headers: {
          // "Content-Type": "multipart/form-data",
          Accept: "application/json",
          token: token,
        },
      }
    )
    .catch((err) => {
      console.log(err);
    });
};

export const CreatPost = async ({
  url,
  data,
  token,
}: {
  url: string;
  data: any;
  token: any;
}) => {
  const result = await fetch(url, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    headers: {
      auth_token: token,
    },
  });
  return await result.json();
};

export const createname = async ({
  name,
}: {
  // post: any;
  name: string | undefined;
}) => {
  if (!name) {
    return;
  }

  return await axios
    .post(
      `${config.apiUrl}/upload`,
      {
        name,
      }
      // {
      //   headers: {
      //     // "Content-Type": "multipart/form-data",
      //     Accept: "application/json",
      //     token: token,
      //   },
      // }
    )
    .catch((err) => {
      console.log(err);
    });
};

export const getData = async ({ id, token }: { id: number; token: any }) => {
  return await axios.post(
    `${config.apiUrl}/api/data/getAllpost/${id}`,
    { id },
    { headers: { authorization: token } }
  );
};

export const deletePost = async ({
  Id,
  token,
}: {
  Id: number;
  token: string;
}) => {
  return await axios.delete(
    `${config.apiUrl}/api/data/deletePost/${Id}`,
    { Id },
    { headers: { authorazition: token } }
  );
};

export const deleterequest = async (id: any, token: any) => {
  const result = await fetch(`${config.apiUrl}/api/data/deletePost/${id}`, {
    method: "delete",
    headers: { authorization: token },
  });
  return await result.json();
};
