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
// export const register = (user) => {
//   return fetch(`${API}/register`, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => console.log(err));
// };

export const rejectUpdateReq = (user) => {
  return fetch(`${API}/update-req/accept/`, { method: "POST" })
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
