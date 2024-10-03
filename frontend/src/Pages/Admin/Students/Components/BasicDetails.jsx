import { SERVER_URL } from "../../../../Utils/URLPath";

export const BasicDetails = ({ studentData }) => {
  return (
    <>
      <div className="font-serif lg:px-16 lg:py-3 ">
        <div className="  lg:flex flex-col items-center  space-x-8 mb-4">
          <div className="">
            <img
              src={`${SERVER_URL}${studentData.student_profile_image}`}
              alt="Student Profile"
              className="w-60 h-60  rounded-full"
            />

            <div className="font-serif lg:text-center  w-full">
              <h4 className="text-xl mt-2 ">{studentData.name_of_student}</h4>
              <strong>SAP ID:</strong> {studentData.student_sap_no}
            </div>
          </div>
        </div>

        {/* Basic Information */}

        <div className="flex font-serif items-center my-4">
          <h3 className="font-serif font-bold lg:text-2xl text-gray-800 flex-shrink-0 pr-4">
            Basic Details
          </h3>
          {/* <div className="flex-grow border-t border-gray-300"></div> */}
          <div className="lg:flex-grow border-t border-gray-300 w-52 lg:w-full"></div>
        </div>

        <div className="lg:px-0  px-5 flex flex-col justify-around font-serif text-[16px]  gap-5 ">
          <div className="flex justify-between">
            <p className="text-gray-400">Roll No:</p>
            <p>{studentData.student_roll_no}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Date of Birth:</p>
            <p>{new Date(studentData.date_of_birth).toLocaleDateString()}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Campus:</p>
            <p>{studentData.campus === "shirpur" ? "Shirpur" : ""}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Program:</p>
            <p>{studentData.program}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Gender:</p>
            <p>{studentData.gender}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Father's Name:</p>
            <p>{studentData.fathers_name}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Mother's Name:</p>
            <p>{studentData.mothers_name}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Student Mobile No:</p>
            <p>{studentData.student_mobile_no}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Father Mobile No:</p>
            <p>{studentData.fathers_mobile_no}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Mother Mobile No:</p>
            <p>
              {studentData.mothers_mobile_no
                ? studentData.mothers_mobile_no
                : "N/A"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Email ID:</p>
            <p>{studentData.student_email_id}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Alternate Email ID:</p>
            <p>{studentData.student_alternate_email_id || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Local Address:</p>
            <p>
              {studentData.local_address}, {studentData.local_address_city},{" "}
              {studentData.local_address_state}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Permanent Address:</p>
            <p>
              {studentData.permanent_address},{" "}
              {studentData.permanent_address_city},{" "}
              {studentData.permanent_address_state},{" "}
              {studentData.permanent_address_country} -{" "}
              {studentData.permanent_address_postal_code}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Aadhar Card No:</p>
            <p>{studentData.aadhar_card_no}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">PAN Card:</p>
            <p>
              {studentData.has_pan_card}{" "}
              {studentData.has_pan_card === "Yes" &&
                `- ${studentData.pan_card_no}`}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Passport:</p>
            <p>
              {studentData.has_passport}{" "}
              {studentData.has_passport === "Yes" &&
                `- ${studentData.passport_no} (Expires: ${new Date(
                  studentData.passport_expiry_date
                ).toLocaleDateString()})`}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
