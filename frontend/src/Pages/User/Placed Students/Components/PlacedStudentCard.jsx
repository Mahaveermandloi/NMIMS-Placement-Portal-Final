import React from "react";

const PlacedStudentCard = () => {
  return (
    <>
      <div class=" max-w-sm bg-white  lg:mt-0 mt-4 rounded-lg shadow-lg  dark:border-gray-700">
        <div class="flex justify-end px-4 pt-4">
          <div
            id="dropdown"
            class="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
          ></div>
        </div>
        <div class="flex flex-col items-center pb-10">
          <img
            class="w-32 h-32 mb-3 rounded-full shadow-lg"
            src="https://media.licdn.com/dms/image/v2/D4D03AQGWs5dU2e5omA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1703488826683?e=2147483647&v=beta&t=YkrgLeCV7j3EMSqPC0jxMOiV2DWtwI1xgJurn7e4pQI"
            alt="Bonnie image"
          />
          <h5 class="mb-1 text-xl font-medium text-gray-900 ">Sneh Bagdi</h5>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Associate Software Developer
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">11.6 LPA</span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/04/Nomura_Holdings_logo.svg"
              alt=""
              className="mt-2"
            />
          </span>
        </div>
      </div>
    </>
  );
};

export default PlacedStudentCard;
