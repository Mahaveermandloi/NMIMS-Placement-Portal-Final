import { SERVER_URL } from "../../../../Utils/URLPath";
import { FaGraduationCap } from "react-icons/fa6";

export const TwelfthStats = ({ studentData }) => {
  return (
    <>
      <div className="mb-16">
        <div className="flex font-serif items-center my-4">
          <h3 className="font-serif font-bold text-lg text-gray-800 flex-shrink-0 pr-4">
            <div className="flex gap-3 items-center">
              <FaGraduationCap size={30} />
              Class XII
            </div>
          </h3>
        </div>
        <div className="flex-grow border-t border-gray-300 mb-4"></div>{" "}
        <div className="flex flex-col font-serif text-[16px] gap-2 ">
          <div className="flex justify-between">
            <p className="text-gray-400">Percentage:</p>
            <p>{studentData.twelfth_standard_percentage}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Year of Passing:</p>
            <p>{studentData.year_of_passing_twelfth}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Board:</p>
            <p>{studentData.board_of_passing_twelfth}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">School:</p>
            <p>{studentData.twelfth_school}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">School City:</p>
            <p>{studentData.twelfth_school_city}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">State:</p>
            <p>{studentData.twelfth_passing_state}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Country:</p>
            <p>{studentData.twelfth_passing_country}</p>
          </div>

          <div className="flex justify-between">
            <p className="text-gray-400">Marksheet:</p>
            <p>
              <a
                href={`${studentData.twelfth_marksheet}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Class XII MARKSHEET
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
