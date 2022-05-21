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

export const verifyUser = (userId) => {
  return fetch(`${API}/authority/verifyUser/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const rejectUser = (userId) => {
  return fetch(`${API}/authority/rejectUser/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
