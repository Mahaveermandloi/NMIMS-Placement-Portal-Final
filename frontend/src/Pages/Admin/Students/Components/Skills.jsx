import { SERVER_URL } from "../../../../Utils/URLPath";

export const Skills = ({ studentData }) => {
  return (
    <>
      <div className="flex items-center my-4 font-serif lg:px-16 lg:py-3">
        <h3 className="font-serif lg:text-2xl text-gray-900 font-bold flex-shrink-0 pr-4">
          Skills
        </h3>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      {/* Display the student's skills */}
      <div className="flex flex-wrap gap-2 lg:px-16">
        {studentData.skills && studentData.skills.length > 0 ? (
          studentData.skills.map((skill, index) => (
            <span
              key={index}
              className="border font-semibold border-gray-300 text-blue-500  rounded-lg text-sm px-4 py-2 uppercase"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-gray-500">No skills available</p>
        )}
      </div>
    </>
  );
};
