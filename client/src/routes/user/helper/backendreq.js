import { API } from "../../../backend";


export const updateReq = (data) => {
  console.log(data);
    return fetch(`${API}/update-req/${data.user._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => console.log(err));
  };

  