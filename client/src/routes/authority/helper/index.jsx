import { API } from "../../../backend";

export const records = () => {
  return fetch(`${API}/authority/records`, { method: "GET" })
    .then((response) => {
      console.log("DATA WE GET IS: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const verificationRecords = () => {
  return fetch(`${API}/authority/verify`, { method: "GET" })
    .then((response) => {
      console.log("DATA WE GET IS: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
