import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { isAuthenticated } from '../../../api/index';
import { profile } from '../helper';
import ImageHelper from '../../../component/ImageHelper';


const Profile = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    profilePhoto: '',
    phoneNumber: '',
    gender: '',
    fatherName: '',
    motherName: '',
    spouse: '',
    dateOfBirth: '',
    dateOfJoining: '',
    postedSchoolName: '',
    postedDesignationName: '',
    postedSchoolLocation: '',
    address: '',
  });
  const {
    name,
    phoneNumber,
    email,
    gender,
    fatherName,
    motherName,
    spouse,
    dateOfBirth,
    dateOfJoining,
    postedSchoolName,
    postedDesignationName,
    postedSchoolLocation,
    address,
    profilePhoto,
  } = values;
  useEffect(() => {
    preload();
  }, []);
  const { user, token } = isAuthenticated();
  const preload = () => {
    profile(user._id, token)
      .then((data) => {
        console.log('DATA WE GET IS: ', data);
        setValues({
          name: data.Name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          fatherName: data.fatherName,
          motherName: data.motherName,
          spouse: data.spouse,
          dateOfBirth: data.DOB,
          dateOfJoining: data.dateOfJoining,
          postedSchoolName: data.postedSchoolName,
          postedDesignationName: data.postedDesignationName,
          postedSchoolLocation: data.postedSchoolLocation,
          address: data.address,
          profilePhoto: data.profilePhoto,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    // <div className="wrapper w-full h-full overflow-auto">
    //   <div className="left-container">
    //     <div className="profile-image">
    //       <ImageHelper user={user} />
    //     </div>
    //     <div className="info">
    //       <p className="name">{name}</p>

    //       <p className="email">
    //         <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> &nbsp;
    //         {email}
    //       </p>
    //       <div className="phone">
    //         <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>&nbsp;{' '}
    //         {phoneNumber}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="right-container">
    //     <div className="personal">
    //       <div className="head">Personal</div>
    //       <div className="p-info">
    //         <div>
    //           <label>Date Of Birth: </label>
    //           <span>{dateOfBirth}</span>
    //         </div>
    //         <div>
    //           <label>Mother's Name: </label>
    //           <span>{motherName}</span>
    //         </div>
    //         <div>
    //           <label>Father's Name: </label>
    //           <span>{fatherName}</span>
    //         </div>
    //         <div>
    //           <label>Address: </label>
    //           <span>{address}</span>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="school">
    //       <div className="head">School</div>
    //       <div className="p-info">
    //         <div>
    //           <label>Designation: </label>
    //           <span>{postedDesignationName}</span>
    //         </div>
    //         <div>
    //           <label>Posted School: </label>
    //           <span>{postedSchoolName}</span>
    //         </div>
    //         <div>
    //           <label>Posted School Location: </label>
    //           <span>{postedSchoolLocation}</span>
    //         </div>
    //         <div>
    //           <label>Date Of Joining: </label>
    //           <span>{dateOfJoining}</span>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <main class="profile-page overflow-auto">
      <section class="relative block h-500-px">
        <div class="absolute top-0 w-full h-full bg-center bg-cover" style={
          {
            backgroundImage: "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=2710&amp;q=80')"
          }
        }>
          <span id="blackOverlay" class="w-full h-full absolute opacity-50 bg-black"></span>
        </div>
        <div class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px" style={{transform: "translateZ(0px)"}}>
          <svg class="absolute bottom-0 overflow-hidden" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" version="1.1" viewBox="0 0 2560 100" x="0" y="0">
            <polygon class="text-blueGray-200 fill-current" points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>
      </section>
      
    </main>
  );
};

export default Profile;
