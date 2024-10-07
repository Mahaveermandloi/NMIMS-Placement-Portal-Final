import { SERVER_URL } from "../../../../Utils/URLPath";

import { TbListDetails } from "react-icons/tb";

export const AdditionalDetails = ({ studentData }) => {
  return (
    <>
      <div className="mb-16">
        <div className="flex font-serif items-center my-4">
          <h3 className="font-serif font-bold text-lg text-gray-800 flex-shrink-0 pr-4">
            <div className="flex gap-5 items-center">
              <TbListDetails size={30} />
              Additional Details
            </div>
          </h3>
        </div>
        <div className="flex-grow border-t border-gray-300 mb-4"></div>
        <div className="flex flex-col font-serif text-[16px] gap-2 ">
          <div className="flex justify-between">
            <p className="text-gray-400">Total Dead KTs:</p>

            <p>{studentData.total_dead_kts}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Total Live KTs:</p>
            <p>{studentData.total_live_kts }</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Last Received Marksheet:</p>
            <p>{studentData.last_received_marksheet || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Has Year Drop or Gap:</p>
            <p>{studentData.has_year_drop_or_gap}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">
              Year Drop Between Tenth and Beginning of Engineering:
            </p>
            <p>
              {studentData.year_drop_between_tenth_and_beginning_of_engineering ||
                "N/A"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Years of Gap:</p>
            <p>{studentData.years_of_gap || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">
              Reason for Gap or Drop Before Engineering:
            </p>
            <p>
              {studentData.reason_for_gap_or_drop_before_engineering || "N/A"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Year Drop Between Engineering:</p>
            <p>{studentData.year_drop_between_engineering || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Years of Gap During Engineering:</p>
            <p>{studentData.years_of_gap_during_engineering || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">
              Reason for Gap or Drop During Engineering:
            </p>
            <p>
              {studentData.reason_for_gap_or_drop_during_engineering || "N/A"}
            </p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">CV Uploaded in NMIMS Format:</p>
            <p>{studentData.cv_uploaded_in_nmims_format || "N/A"}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Documents Uploaded:</p>
            <p>{studentData.documents_uploaded || "N/A"}</p>
          </div>
        </div>
      </div>
    </>
  );
};
