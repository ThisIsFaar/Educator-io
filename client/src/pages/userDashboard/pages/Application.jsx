import { useState } from "react";
import { toast } from "react-toastify";
import Joi from "joi";
import { application } from "../helper";
import { isAuthenticated } from "../../../api/";
import { toastObjDetails } from "../../../utils/data";
import "react-toastify/dist/ReactToastify.css";
// import "./Application.css";

const { user, token } = isAuthenticated();
const Application = () => {
  const [values, setValues] = useState({
    Name: "",
    profilePhoto: "",
    phoneNumber: "",
    gender: "",
    fatherName: "",
    motherName: "",
    spouse: "",
    dateOfBirth: "",
    dateOfJoining: "",
    postedSchoolName: "",
    postedDesignation: "",
    postedSchoolLocation: "",
    address: "",
    disabled: false,
    error: {},
    success: false,
  });
  const {
    Name,
    phoneNumber,
    gender,
    fatherName,
    motherName,
    spouse,
    dateOfBirth,
    dateOfJoining,
    postedSchoolName,
    postedDesignation,
    postedSchoolLocation,
    address,
    profilePhoto,
  } = values;
  const schema = Joi.object({
    Name: Joi.string().min(4).max(20).required(),
    phoneNumber: Joi.string().min(10).max(20).required(),
    gender: Joi.string().min(4).max(20).required(),
    fatherName: Joi.string().min(4).max(20).required(),
    motherName: Joi.string().min(4).max(20).required(),
    spouse: Joi.string().min(4).max(20).required(),
    dateOfBirth: Joi.string().min(4).max(70).required(),
    dateOfJoining: Joi.string().min(4).max(70).required(),
    postedSchoolName: Joi.string().min(4).max(70).required(),
    postedDesignation: Joi.string().min(4).max(70).required(),
    postedSchoolLocation: Joi.string().min(4).max(70).required(),
    address: Joi.string().min(4).max(150).required(),
  });

  const handleChange = (name) => (event) => {
    const value =
      name === "profilePhoto" ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { error } = schema.validate({
      Name,
      phoneNumber,
      gender,
      fatherName,
      motherName,
      spouse,
      dateOfBirth,
      dateOfJoining,
      postedSchoolName,
      postedDesignation,
      postedSchoolLocation,
      address,
    });

    if (error) {
      console.log("error");
      toast.error(error.message, toastObjDetails);
      setValues({ ...values, error: error });
    } else {
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("phoneNumber", phoneNumber);
      formData.append("gender", gender);
      formData.append("fatherName", fatherName);
      formData.append("motherName", motherName);
      formData.append("spouse", spouse);
      formData.append("DOB", dateOfBirth);
      formData.append("dateOfJoining", dateOfJoining);
      formData.append("postedSchoolName", postedSchoolName);
      formData.append("postedDesignationName", postedDesignation);
      formData.append("postedSchoolLocation", postedSchoolLocation);
      formData.append("address", address);
      formData.append("profilePhoto", profilePhoto);
      console.log(user._id);
      console.log("check", user);
      application(user._id, token, formData)
        .then((data) => {
          console.log(data);
          if (data.status === 200) {
            setValues({
              Name: "",
              phoneNumber: "",
              gender: "",
              fatherName: "",
              motherName: "",
              spouse: "",
              dateOfBirth: "",
              dateOfJoining: "",
              postedSchoolName: "",
              postedDesignation: "",
              postedSchoolLocation: "",
              address: "",
              formData: "",
              profilePhoto: null,
              disabled: true,
              error: {},
              success: true,
            });
            toast.success(data.message, toastObjDetails);
          } else if (data.status === 400) {
            toast.error(data.message, toastObjDetails);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        className="container--box w-full h-full overflow-auto"
      >
        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              for="first_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="first_name"
              class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John"
              required
              onChange={handleChange("Name")}
              value={Name}
            />
          </div>
          <div>
            <label
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              for="default_size"
            >
              Choose A Profile Photo
            </label>
            <input
              class="block w-full mb-5 text-sm text-gray-900 cursor-pointer dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400"
              id="default_size"
              type="file"
              required
              onChange={handleChange("profilePhoto")}
              name="profilePhoto"
              accept="image"
            />
          </div>
          <div>
            <label
              for="phone"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Phone number
            </label>
            <input
              type="tel"
              id="phone"
              class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="123-45-678"
              pattern="[789][0-9]{9}"
              onChange={handleChange("phoneNumber")}
              value={phoneNumber}
              required
            />
          </div>
          <div>
            <label
              for="gender"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Male"
              onChange={handleChange("gender")}
              value={gender}
              required
            />
          </div>
          <div>
            <label
              for="father's_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Father's Name
            </label>
            <input
              type="url"
              id="father's_name"
              class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mr. XYZ"
              required
              onChange={handleChange("fatherName")}
              value={fatherName}
            />
          </div>
          <div>
            <label
              for="mother's_name"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mother's Name
            </label>
            <input
              type="text"
              id="mother's_name"
              class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Mrs. ABC"
              required
              onChange={handleChange("motherName")}
              value={motherName}
            />
          </div>
          <div>
            <label
              for="date_of_birth"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="date_of_birth"
              class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange("dateOfBirth")}
              value={dateOfBirth}
              required
            />
          </div>

          <div>
            <label
              for="date_of_joining"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Date of Joining
            </label>
            <input
              type="date"
              id="date_of_joining"
              class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={handleChange("dateOfJoining")}
              value={dateOfJoining}
              required
            />
          </div>
        </div>
        <div class="mb-6">
          <label
            for="spouse"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Spouse
          </label>
          <input
            type="text"
            id="spouse"
            class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your spouse name"
            onChange={handleChange("spouse")}
            value={spouse}
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="posted_school_name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Posted School Name
          </label>
          <input
            type="text"
            id="posted_school_name"
            class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange("postedSchoolName")}
            value={postedSchoolName}
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="posted_destination"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Posted Destination
          </label>
          <input
            type="text"
            id="posted_destination"
            class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange("postedDesignation")}
            value={postedDesignation}
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="posted_school_location"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Posted School Location
          </label>
          <input
            type="text"
            id="posted_school_location"
            class="bg-gray-300 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleChange("postedSchoolLocation")}
            value={postedSchoolLocation}
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="message"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <textarea
            id="message"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Address"
            onChange={handleChange("address")}
            value={address}
            rows="2"
          />
        </div>
        <input
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={onSubmit}
          value="Submit Application"
        />
      </form>
    </>
  );
};

export default Application;