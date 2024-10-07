import { SERVER_URL } from "../../../../Utils/URLPath";
import { GiDiploma } from "react-icons/gi";

export const DiplomaStats = ({ studentData }) => {
  return (
    <>
      {!studentData.diploma_stream  ? (
        <>
          <div className="flex font-serif items-center my-4">
            <h3 className="font-serif font-bold text-lg text-gray-800 flex-shrink-0 pr-4">
              <div className="flex gap-5 items-center">
                <GiDiploma size={30} />
                Diploma
              </div>
            </h3>
          </div>
          <div className="flex-grow border-t border-gray-300 mb-4 "></div>
          <div className="font-serif text-lg ">
            No Data for Diploma

          </div>
        </>
      ) : (
        <>
          <div className="flex font-serif items-center my-4">
            <h3 className="font-serif font-bold text-lg text-gray-800 flex-shrink-0 pr-4">
              <div className="flex gap-3 items-center">
                <GiDiploma size={30} />
                Diploma
              </div>
            </h3>
          </div>
          <div className="flex-grow border-t border-gray-300 mb-4 "></div>

          <div className="mb-16">
            <div className="flex flex-col font-serif text-[16px] gap-2">
              <div className="flex justify-between">
                <p className="text-gray-400">Stream:</p>
                <p>{studentData.diploma_stream}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">College:</p>
                <p>{studentData.diploma_college}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Board:</p>
                <p>{studentData.diploma_board_of_passing}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Year of Passing:</p>
                <p>{studentData.diploma_year_of_passing}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">State:</p>
                <p>{studentData.diploma_passing_state}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Country:</p>
                <p>{studentData.diploma_passing_country}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">First Year First Semester %:</p>
                <p>
                  {studentData.first_year_first_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">First Year Second Semester %:</p>
                <p>
                  {studentData.first_year_second_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">First Year %:</p>
                <p>{studentData.first_year_percentage_diploma}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Second Year Third Semester %:</p>
                <p>
                  {studentData.second_year_third_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Second Year Fourth Semester %:</p>
                <p>
                  {studentData.second_year_fourth_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Second Year %:</p>
                <p>{studentData.second_year_percentage_diploma}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Third Year Fifth Semester %:</p>
                <p>
                  {studentData.third_year_fifth_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Third Year Sixth Semester %:</p>
                <p>
                  {studentData.third_year_sixth_semester_percentage_diploma}
                </p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Third Year %:</p>
                <p>{studentData.third_year_percentage_diploma}</p>
              </div>

              {studentData.fourth_year_seventh_semester_percentage_diploma && (
                <>
                  <div className="flex justify-between">
                    <p className="text-gray-400">
                      Fourth Year Seventh Semester %:
                    </p>
                    <p>
                      {
                        studentData.fourth_year_seventh_semester_percentage_diploma
                      }
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-400">
                      Fourth Year Eighth Semester %:
                    </p>
                    <p>
                      {
                        studentData.fourth_year_eighth_semester_percentage_diploma
                      }
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-gray-400">Fourth Year %:</p>
                    <p>{studentData.fourth_year_percentage_diploma}</p>
                  </div>
                </>
              )}

              <div className="flex justify-between">
                <p className="text-gray-400">Final Percentage:</p>
                <p>{studentData.final_percentage_diploma}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Aggregate Percentage:</p>
                <p>{studentData.aggregate_percentage_diploma}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-400">Marksheet:</p>
                <p>
                  <a
                    href={`${studentData.diploma_marksheet}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Diploma MARKSHEET

                    
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
