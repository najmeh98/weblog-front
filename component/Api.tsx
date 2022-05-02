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
