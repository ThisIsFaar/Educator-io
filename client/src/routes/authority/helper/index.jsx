import { API } from "../../../backend";

export const records = () => {
  return fetch(`${API}/authority/records`, { method: "GET" })
    .then((response) => {
      console.log("DATA WE GET IS: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateRecords = () => {
  return fetch(`${API}/authority/updateRequest`, { method: "GET" })
    .then((response) => {
      console.log("DATA WE GET IS: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const acceptUpdateReq = (user, token, muser, updateData) => {
  console.log(updateData);
  return fetch(`${API}/update-req/accept/${user.id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  })
    .then((response) => {
      console.log("DATA WE GET IS: ", response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const rejectUpdateReq = (user, token, muser, updateData) => {
  return fetch(`${API}/update-req/reject/${user.id}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateData),
  })
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
