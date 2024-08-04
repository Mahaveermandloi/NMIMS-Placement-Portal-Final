import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getApi } from "../../../../Utils/API.js";

const StudentCompleteDetails = () => {
  const { student_sap_no } = useParams();

  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await getApi(
          `/api/student/get-student-details-by-id/${student_sap_no}`
        );
        console.log(response.data);
        setStudentData(response.data);
      } catch (error) {
        setError("Failed to fetch student data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [student_sap_no]);

  if (loading) return <div className="text-blue-500">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!studentData)
    return <div className="text-red-500">No student data available</div>;

  // Define the data fields to display
  const studentFields = [
    { label: "SAP ID", value: studentData.student_sap_no },
    { label: "Roll No", value: studentData.student_roll_no },
    { label: "Campus", value: studentData.campus },
    { label: "Program", value: studentData.program },
    {
      label: "Engineering Specialization",
      value: studentData.engineering_specialization,
    },
    { label: "Name", value: studentData.name_of_student },
    { label: "Father's Name", value: studentData.fathers_name },
    { label: "Mother's Name", value: studentData.mothers_name },
    {
      label: "Date of Birth",
      value: new Date(studentData.date_of_birth).toLocaleDateString(),
    },
    { label: "Gender", value: studentData.gender },
    {
      label: "Local Address",
      value: `${studentData.local_address}, ${studentData.local_address_city}, ${studentData.local_address_state}`,
    },
    {
      label: "Permanent Address",
      value: `${studentData.permanent_address}, ${studentData.permanent_address_city}, ${studentData.permanent_address_state}, ${studentData.permanent_address_country}`,
    },
    { label: "Mobile Number", value: studentData.student_mobile_no },
    {
      label: "Alternate Mobile Number",
      value: studentData.alternate_student_mobile_no,
    },
    { label: "Father's Mobile Number", value: studentData.fathers_mobile_no },
    { label: "Mother's Mobile Number", value: studentData.mothers_mobile_no },
    { label: "Home Landline Number", value: studentData.home_landline_no },
    { label: "Home Mobile Number", value: studentData.home_mobile_no },
    { label: "Student Email ID", value: studentData.student_email_id },
    {
      label: "Alternate Email ID",
      value: studentData.student_alternate_email_id,
    },
    { label: "Father's Email ID", value: studentData.fathers_email_id },
    { label: "Mother's Email ID", value: studentData.mothers_email_id },
    { label: "PAN Card Number", value: studentData.pan_card_no },
    { label: "Aadhar Card Number", value: studentData.aadhar_card_no },
    { label: "Passport Number", value: studentData.passport_no },
    {
      label: "Passport Expiry Date",
      value: new Date(studentData.passport_expiry_date).toLocaleDateString(),
    },
    {
      label: "Tenth Standard Percentage",
      value: studentData.tenth_standard_percentage,
    },
    {
      label: "Year of Passing Tenth",
      value: studentData.year_of_passing_tenth,
    },
    {
      label: "Board of Passing Tenth",
      value: studentData.board_of_passing_tenth,
    },
    { label: "Tenth School", value: studentData.tenth_school },
    { label: "Tenth Passing State", value: studentData.tenth_passing_state },
    {
      label: "Tenth Passing Country",
      value: studentData.tenth_passing_country,
    },
    {
      label: "Twelfth Standard Percentage",
      value: studentData.twelfth_standard_percentage,
    },
    {
      label: "Year of Passing Twelfth",
      value: studentData.year_of_passing_twelfth,
    },
    {
      label: "Board of Passing Twelfth",
      value: studentData.board_of_passing_twelfth,
    },
    { label: "Twelfth School", value: studentData.twelfth_school },
    { label: "Twelfth School City", value: studentData.twelfth_school_city },
    {
      label: "Twelfth Passing State",
      value: studentData.twelfth_passing_state,
    },
    {
      label: "Twelfth Passing Country",
      value: studentData.twelfth_passing_country,
    },
    { label: "Diploma Stream", value: studentData.diploma_stream },
    {
      label: "Diploma Passing State",
      value: studentData.diploma_passing_state,
    },
    {
      label: "Diploma Passing Country",
      value: studentData.diploma_passing_country,
    },
    { label: "Diploma College", value: studentData.diploma_college },
    {
      label: "Diploma Board of Passing",
      value: studentData.diploma_board_of_passing,
    },
    {
      label: "Diploma Year of Passing",
      value: studentData.diploma_year_of_passing,
    },
    {
      label: "First Year First Semester Percentage (Diploma)",
      value: studentData.first_year_first_semester_percentage_diploma,
    },
    {
      label: "First Year Second Semester Percentage (Diploma)",
      value: studentData.first_year_second_semester_percentage_diploma,
    },
    {
      label: "First Year Percentage (Diploma)",
      value: studentData.first_year_percentage_diploma,
    },
    {
      label: "Second Year Third Semester Percentage (Diploma)",
      value: studentData.second_year_third_semester_percentage_diploma,
    },
    {
      label: "Second Year Fourth Semester Percentage (Diploma)",
      value: studentData.second_year_fourth_semester_percentage_diploma,
    },
    {
      label: "Second Year Percentage (Diploma)",
      value: studentData.second_year_percentage_diploma,
    },
    {
      label: "Third Year Fifth Semester Percentage (Diploma)",
      value: studentData.third_year_fifth_semester_percentage_diploma,
    },
    {
      label: "Third Year Sixth Semester Percentage (Diploma)",
      value: studentData.third_year_sixth_semester_percentage_diploma,
    },
    {
      label: "Third Year Percentage (Diploma)",
      value: studentData.third_year_percentage_diploma,
    },
    {
      label: "Fourth Year Seventh Semester Percentage (Diploma)",
      value: studentData.fourth_year_seventh_semester_percentage_diploma,
    },
    {
      label: "Fourth Year Eighth Semester Percentage (Diploma)",
      value: studentData.fourth_year_eighth_semester_percentage_diploma,
    },
    {
      label: "Fourth Year Percentage (Diploma)",
      value: studentData.fourth_year_percentage_diploma,
    },
    {
      label: "Final Percentage (Diploma)",
      value: studentData.final_percentage_diploma,
    },
    {
      label: "Aggregate Percentage (Diploma)",
      value: studentData.aggregate_percentage_diploma,
    },
    {
      label: "Year of Passing Diploma",
      value: studentData.year_of_passing_diploma,
    },
    {
      label: "GPA First Semester First Year",
      value: studentData.gpa_first_semester_first_year,
    },
    {
      label: "CGPA First Semester First Year",
      value: studentData.cgpa_first_semester_first_year,
    },
    {
      label: "Academic Year Clearing Sem 1",
      value: studentData.academic_year_clearing_sem1,
    },
    {
      label: "GPA Second Semester First Year",
      value: studentData.gpa_second_semester_first_year,
    },
    {
      label: "CGPA Second Semester First Year",
      value: studentData.cgpa_second_semester_first_year,
    },
    {
      label: "Academic Year Clearing Sem 2",
      value: studentData.academic_year_clearing_sem2,
    },
    {
      label: "GPA Third Semester Second Year",
      value: studentData.gpa_third_semester_second_year,
    },
    {
      label: "CGPA Third Semester Second Year",
      value: studentData.cgpa_third_semester_second_year,
    },
    {
      label: "Academic Year Clearing Sem 3",
      value: studentData.academic_year_clearing_sem3,
    },
    {
      label: "GPA Fourth Semester Second Year",
      value: studentData.gpa_fourth_semester_second_year,
    },
    {
      label: "CGPA Fourth Semester Second Year",
      value: studentData.cgpa_fourth_semester_second_year,
    },
    {
      label: "Academic Year Clearing Sem 4",
      value: studentData.academic_year_clearing_sem4,
    },
    {
      label: "GPA Fifth Semester Third Year",
      value: studentData.gpa_fifth_semester_third_year,
    },
    {
      label: "CGPA Fifth Semester Third Year",
      value: studentData.cgpa_fifth_semester_third_year,
    },
    {
      label: "Academic Year Clearing Sem 5",
      value: studentData.academic_year_clearing_sem5,
    },
    {
      label: "GPA Sixth Semester Third Year",
      value: studentData.gpa_sixth_semester_third_year,
    },
    {
      label: "CGPA Sixth Semester Third Year",
      value: studentData.cgpa_sixth_semester_third_year,
    },
    {
      label: "Academic Year Clearing Sem 6",
      value: studentData.academic_year_clearing_sem6,
    },
    { label: "Total Dead KTs", value: studentData.total_dead_kts },
    { label: "Total Live KTs", value: studentData.total_live_kts },
    {
      label: "Last Received Marksheet",
      value: studentData.last_received_marksheet,
    },
    {
      label: "Has Year Drop or Gap",
      value: studentData.has_year_drop_or_gap ? "Yes" : "No",
    },
    {
      label: "Year Drop Between Tenth and Beginning of Engineering",
      value: studentData.year_drop_between_tenth_and_beginning_of_engineering
        ? "Yes"
        : "No",
    },
    { label: "Years of Gap", value: studentData.years_of_gap },
    {
      label: "Reason for Gap or Drop Before Engineering",
      value: studentData.reason_for_gap_or_drop_before_engineering,
    },
    {
      label: "Year Drop Between Engineering",
      value: studentData.year_drop_between_engineering ? "Yes" : "No",
    },
    {
      label: "Gap Between Engineering Years",
      value: studentData.gap_between_engineering_years,
    },
    {
      label: "Reason for Gap Between Engineering Years",
      value: studentData.reason_for_gap_between_engineering_years,
    },
    { label: "Any Other Gap Years", value: studentData.any_other_gap_years },
    {
      label: "Reason for Any Other Gap Years",
      value: studentData.reason_for_any_other_gap_years,
    },
    {
      label: "Project or Paper Presentation",
      value: studentData.project_or_paper_presentation,
    },
  ];

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Student Complete Details</h1>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <tbody>
          {studentFields.map((field, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="px-6 py-4 font-medium text-gray-700">
                {field.label}:
              </td>
              <td className="px-6 py-4 text-gray-600">
                {field.value || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentCompleteDetails;
