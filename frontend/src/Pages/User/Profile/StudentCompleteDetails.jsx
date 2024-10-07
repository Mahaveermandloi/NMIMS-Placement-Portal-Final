import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../../Components/Loader.jsx";
import { SERVER_URL } from "../../../../Utils/URLPath.jsx";
import { Toast } from "../../../../Components/Toast.jsx";
import { getApi } from "../../../../Utils/API.js";
import { BasicDetails } from "./BasicDetails.jsx";
import { TenthStats } from "./TenthStats.jsx";
import { TwelfthStats } from "./TwelfthStats.jsx";
import { DiplomaStats } from "./DiplomaStats.jsx";
import { CollegeStats } from "./CollegeStats.jsx";
import { Skills } from "./Skills.jsx";
import { InternshipAndExperienceDetails } from "./InternshipAndExperienceDetails.jsx";
import { Projects } from "./Projects.jsx";
import { ExtraCurricularActivities } from "./ExtraCurricularActivities.jsx";
import { AdditionalDetails } from "./AdditionalDetails.jsx";

const StudentCompleteDetails = () => {
  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true); // Add a loading state
  const { student_sap_no } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true); // Start loading before fetching
        const response = await getApi(
          `/api/student/get-student-details-by-id/${student_sap_no}`
        );

      
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      } finally {
        setLoading(false); // End loading after fetching is complete
      }
    };

    fetchStudentData();
  }, [student_sap_no]);

  if (loading) {
    return <Loader />; // Show loader while loading
  }

  return (
    <>
      <Toast />
      <div className="  mx-auto  text-sm  lg:text-md  ">
        <h2 className="text-xl lg:text-2xl font-bold mb-4">
          Student Information
        </h2>

        <BasicDetails studentData={studentData} />

        <EducationDetails studentData={studentData} />

        <Skills />

        <InternshipAndExperienceDetails />
        <Projects />
        <ExtraCurricularActivities />
      </div>
    </>
  );
};

export default StudentCompleteDetails;

const EducationDetails = ({ studentData }) => {
  return (
    <>
      <div className="lg:px-16">
        <div className="flex font-serif items-center my-4">
          <h3 className="font-serif font-bold text-lg text-gray-800 flex-shrink-0 pr-4">
            Education Details
          </h3>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="px-5 ">
          <TenthStats studentData={studentData} />
          <TwelfthStats studentData={studentData} />
          <DiplomaStats studentData={studentData} />
          <CollegeStats studentData={studentData} />
          <AdditionalDetails studentData={studentData} />
        </div>
      </div>
    </>
  );
};
