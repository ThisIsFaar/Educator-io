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

    // <main className=' overflow-auto  '>
    //   <pre>{JSON.stringify(values, undefined, 2)}</pre>
    // </main>
    <div className="bg-white relative shadow rounded-lg w-full md:w-2/3 mx-auto p-4 h-full flex flex-col justify-evenly">
        <div className="flex justify-center">
          {/* <img src="https://avatars0.githubusercontent.com/u/35900628?v=4" alt="" className="rounded-full mx-auto absolute -top-20 w-32 h-32 shadow-md border-4 border-white transition duration-200 transform hover:scale-110" /> */}
          <ImageHelper user={user} />
        </div>

        <div className="my-4 overflow-auto">
          <h1 className="font-bold text-center text-3xl text-gray-900">{name}</h1>
          <p className="text-center text-sm text-gray-400 font-medium">{postedDesignationName}</p>

          <div className="w-full">
            <div class="w-full h-64">
              <div class="bg-white shadow-sm rounded-sm p-4">
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span class="tracking-wide">Details</span>
                </div>
                <div class="text-gray-700 ">
                  <div class="grid lg:grid-cols-2 text-sm">
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Email</div>
                      <div class="px-4 py-2">{email}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Phone</div>
                      <div class="px-4 py-2">{phoneNumber}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Gender</div>
                      <div class="px-4 py-2">{gender}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Father Name</div>
                      <div class="px-4 py-2">{fatherName}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Mother Name</div>
                      <div class="px-4 py-2">{motherName}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Spouse</div>
                      <div class="px-4 py-2">{spouse}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">DOB</div>
                      <div class="px-4 py-2">
                        <a class="text-blue-800">{dateOfBirth}</a>
                      </div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Date Of Joining</div>
                      <div class="px-4 py-2">{dateOfJoining}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Posted School Name</div>
                      <div class="px-4 py-2">{postedSchoolName}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Posted Designation Name</div>
                      <div class="px-4 py-2">{postedDesignationName}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Posted School Location</div>
                      <div class="px-4 py-2">{postedSchoolLocation}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Address</div>
                      <div class="px-4 py-2">{address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;
