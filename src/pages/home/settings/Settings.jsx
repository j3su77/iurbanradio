import React, { useContext } from "react";
import { Context } from "../../../context/Context";
import { MdEmail } from "react-icons/md"
import { FaUser } from "react-icons/fa"
const Settings = () => {

    const { user, apiURL, apiUrlImg } = useContext(Context)

  return (
      <div className="min-h-screen ">
    <div className="container mx-auto flex justify-center">
      <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-gray-50 text-gray-800">
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src={user.profilePic ? apiUrlImg + user.profilePic : ""}
            alt=""
            className="object-cover object-center w-full h-full rounded"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div className="space-y-1">
              <span className="flex items-center space-x-2">
            <FaUser className="text-2xl" />
            <span className="text-2xl font-semibold">{user.username}</span>
            </span>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
           
                <MdEmail className="text-2xl" />

              <span className="text-gray-600 ">
                {user.email}
              </span>
            </span>
    
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Settings;
