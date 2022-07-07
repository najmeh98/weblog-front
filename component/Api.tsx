import axios, { AxiosResponse } from "axios";

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
}): Promise<void> => {
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
}): Promise<AxiosResponse<any, any>> | undefined => {
  if (!email || !password || !name) {
    return;
  }
  return axios.post(`${config.apiUrl}/api/user/auth`, {
    name,
    email,
    password,
  });
};

export const getData = async ({ id, token }: { id: number; token: any }) => {
  return await axios.post(
    `${config.apiUrl}/api/data/getAllpost/${id}`,
    { id },
    { headers: { authorization: token } }
  );
};

export const deleterequest = async (id: any, token: any) => {
  const result = await fetch(`${config.apiUrl}/api/data/deletePost/${id}`, {
    method: "delete",
    headers: { authorization: token },
  });
  return await result.json();
};
