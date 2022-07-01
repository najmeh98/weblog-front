import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

// const fetcher = (url, token) =>
//   axios
//     .get(url, { headers: { Authorization: "Bearer " + token } })
//     .then((res) => res.data);
