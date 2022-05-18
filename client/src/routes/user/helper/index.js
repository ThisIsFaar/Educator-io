import { API } from "../../../backend";

export const application = (userId, token, data) => {
  return fetch(`${API}/application/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const profile = (userId, token) => {
  return fetch(`${API}/application/profile/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("DATA WE GET IS: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
