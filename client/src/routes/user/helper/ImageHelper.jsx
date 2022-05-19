import React from "react";
import { API } from "../../../backend";

const ImageHelper = ({ user }) => {
  const imageUrl = user
    ? `${API}/application/photo/${user._id}`
    : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`;
<<<<<<< HEAD
  return <img src={imageUrl} style={{ borderRadius: "50%" }} />;
=======
  return (
    <img src={imageUrl} alt="photo" className="rounded-circle w-100 h-100"  style={{borderRadius: "15rem"}}/>
  );
>>>>>>> 5a44d826a2b5b38e0bd7800ab8d4a5109fbea777
};

export default ImageHelper;
