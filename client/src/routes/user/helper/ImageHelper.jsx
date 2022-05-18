import React from "react";
import { API } from "../../../backend";

const ImageHelper = ({ user }) => {
  console.log(user);
  const imageUrl = user
    ? `${API}/application/photo/${user._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
  return (
    <img src={imageUrl} alt="photo" className="rounded-circle w-100 h-100" />
  );
};

export default ImageHelper;
