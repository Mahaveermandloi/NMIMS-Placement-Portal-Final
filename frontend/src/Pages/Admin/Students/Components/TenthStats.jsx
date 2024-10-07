import { SERVER_URL } from "../../../../Utils/URLPath";
import { FaGraduationCap } from "react-icons/fa6";

export const TenthStats = ({ studentData }) => {
  return (
    <>
      <div className="mb-16">
        <div className=" flex font-serif items-center my-4 ">
          <h3 className="font-serif font-bold text-lg text-gray-800 flex-shrink-0 pr-4">
            <div className="flex gap-3 items-center">
              <FaGraduationCap size={30} />
              Class X
            </div>
          </h3>
        </div>
        <div className="flex-grow border-t border-gray-300 mb-4"></div>{" "}
        {/* Adjusted for spacing */}
        <div className="flex flex-col font-serif text-[16px] gap-2 ">
          <div className="flex justify-between">
            <p className="text-gray-400">School:</p>
            <p>{studentData.tenth_school}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Board:</p>
            <p>{studentData.board_of_passing_tenth}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Programme/Degree:</p>
            <p>10th</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Percentage:</p>
            <p>{studentData.tenth_standard_percentage}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Year of Passing:</p>
            <p>{studentData.year_of_passing_tenth}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">State:</p>
            <p>{studentData.tenth_passing_state}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Country:</p>
            <p>{studentData.tenth_passing_country}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Marksheet:</p>
            <p>
              <a
                href={`${studentData.tenth_marksheet}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Class X MARKSHEET
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
