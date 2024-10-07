import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import FormSideBar from "./FormSideBar.jsx";
import PersonalDetails from "./PersonalDetails.jsx";
import Class10th from "./Forms/Class10th.jsx";
import Class12th from "./Forms/Class12th.jsx";
import Diploma from "./Forms/Diploma.jsx";
import AdditionalDetails from "./Forms/AdditionalDetails.jsx";
import College from "./Forms/College.jsx";

// import OtherDetails from "./OtherDetails.jsx";
import logo from "./../../../../public/images/nmimslogo.png";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import { postApi } from "../../../Utils/API.js";
import { Toast } from "../../../Components/Toast.jsx";
import { SERVER_URL, STUDENT_PATH } from "../../../Utils/URLPath.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../../Components/Loader.jsx";

const FormPage = () => {
  const [currentPage, setPage] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const methods = useForm();

  const { handleSubmit } = methods;

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <PersonalDetails />;
      case 1:
        return <Class10th />;
      case 2:
        return <Class12th />;
      case 3:
        return <Diploma />;
      case 4:
        return <College />;
      case 5:
        return <AdditionalDetails />;
      default:
        return <PersonalDetails />;
    }
  };

  const handlePrevious = () => {
    setPage((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    setLoading(true);



    try {
      const response = await postApi(
        data,
        `${SERVER_URL}/api/student/register`
      );

      if (response.statusCode === 200) {
        toast.success("Request Sent Successfully");

        setTimeout(() => {
          // navigate(`${STUDENT_PATH}/login`);
        }, 1000);
      }
    } catch (error) {
    
      toast.error(error.response.data.message);
      // toast.error("An error occurred during registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    const isValid = await methods.trigger(); // Validate the current page

    if (isValid) {
      if (currentPage === 5) {
        handleSubmit(onSubmit)(); // Trigger the form submission on the last page
      } else {
        setPage((prev) => prev + 1);
      }
    }
  };

  return (
    <>
      <Toast />
      <div className="lg:flex h-screen">
        <div className="lg:hidden p-4">
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-gray-500 focus:outline-none"
          >
            <HiMenu size={30} />
          </button>
        </div>

        <div
          className={`fixed inset-y-0 left-0 bg-white w-[70%] transition-transform transform lg:relative lg:translate-x-0 z-50 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          } lg:flex lg:w-96 bg-white shadow-lg lg:shadow-none`}
        >
          <FormSideBar
            currentPage={currentPage}
            setPage={(page) => {
              setPage(page);
              setDrawerOpen(false);
            }}
          />
          <button
            onClick={() => setDrawerOpen(false)}
            className="lg:hidden absolute top-4 right-6 text-gray-500"
          >
            <IoArrowBackCircleOutline size={30} />
          </button>
        </div>

        <FormProvider {...methods}>
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <div className="lg:w-5/6 p-2 bg-gray-100 overflow-y-auto">
                <div className="flex flex-col w-full justify-center items-center">
                  <img src={logo} className="h-20" alt="NMIMS Logo" />
                  {renderPage()}

             
             
                  <div className="flex justify-between w-full mt-6">
                    <button
                      onClick={handlePrevious}
                      className={`bg-gray-500 text-white px-4 py-2 rounded ${
                        currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={currentPage === 0}
                    >
                      Previous
                    </button>
                    <button
                      onClick={handleNext}
                      className={`bg-blue-500 text-white px-4 py-2 rounded ${
                        loading ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                    >
                      {currentPage === 5 ? "Submit" : "Next"}
                    </button>
                  </div>



                </div>
              </div>
            </>
          )}
        </FormProvider>
      </div>
    </>
  );
};

export default FormPage;
