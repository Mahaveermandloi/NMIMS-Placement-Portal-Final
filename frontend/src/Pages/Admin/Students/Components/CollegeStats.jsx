import { SERVER_URL } from "../../../../Utils/URLPath";
import { LuSchool } from "react-icons/lu";

export const CollegeStats = ({ studentData }) => {
  return (
    <>
      <div className="mb-16">
        <div className="flex font-serif items-center my-4">
          <h3 className="font-serif font-bold text-lg text-gray-800 flex-shrink-0 pr-4">
            <div className="flex gap-3 items-center">
              <LuSchool size={30} />
              College
            </div>
          </h3>
        </div>
        <div className="flex-grow border-t border-gray-300 mb-4"></div>

        <div className="lg:grid grid-cols-2 lg:gap-10 ">
          {/* GPA, CGPA and academic year clearing */}
          <div className="flex flex-col font-serif text-[16px] gap-2">
            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 1:</p>
              <p>{studentData.academic_year_clearing_sem1}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">1st Semester GPA:</p>
              <p>{studentData.gpa_first_semester_first_year}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">1st Semester CGPA:</p>
              <p>{studentData.cgpa_first_semester_first_year}</p>
            </div>

            <hr />
            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 2:</p>
              <p>{studentData.academic_year_clearing_sem2}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">2nd Semester GPA:</p>
              <p>{studentData.gpa_second_semester_first_year}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">2nd Semester CGPA:</p>
              <p>{studentData.cgpa_second_semester_first_year}</p>
            </div>

            <hr />

            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 3:</p>
              <p>{studentData.academic_year_clearing_sem3}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">3rd Semester GPA:</p>
              <p>{studentData.gpa_third_semester_second_year}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">3rd Semester CGPA:</p>
              <p>{studentData.cgpa_third_semester_second_year}</p>
            </div>

            <hr />

            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 4:</p>
              <p>{studentData.academic_year_clearing_sem4}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">4th Semester GPA:</p>
              <p>{studentData.gpa_fourth_semester_second_year}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">4th Semester CGPA:</p>
              <p>{studentData.cgpa_fourth_semester_second_year}</p>
            </div>

            <hr />

            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 5:</p>
              <p>{studentData.academic_year_clearing_sem5}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">5th Semester GPA:</p>
              <p>{studentData.gpa_fifth_semester_third_year}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">5th Semester CGPA:</p>
              <p>{studentData.cgpa_fifth_semester_third_year}</p>
            </div>

            <hr />

            <div className="flex justify-between">
              <p className="text-gray-400">Academic Year Clearing Sem 6:</p>
              <p>{studentData.academic_year_clearing_sem6}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">6th Semester GPA:</p>
              <p>{studentData.gpa_sixth_semester_third_year}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">6th Semester CGPA:</p>
              <p>{studentData.cgpa_sixth_semester_third_year}</p>
            </div>
          </div>

          {/* Marksheet Links */}
          <div className="mt-10 lg:mt-0 flex flex-col font-serif text-[16px] gap-2">
            <div className="flex justify-between">
              <p className="text-gray-400">Resume/ CV:</p>
              <p>
                <a
                  href={`${studentData.student_cv}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View ResumeCV
                </a>
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM I:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_1}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM II:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_2}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM III:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_3}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM IV:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_4}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM V:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_5}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-400">Marksheet SEM VI:</p>
              <p>
                <a
                  href={`${studentData.student_marksheet_sem_6}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Marksheet
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
