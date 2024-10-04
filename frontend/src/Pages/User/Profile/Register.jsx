// import React, { useState } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import PersonalDetails from "./PersonalDetails.jsx";
// import Class10th from "./Forms/Class10th.jsx";
// import Class12th from "./Forms/Class12th.jsx";
// import Diploma from "./Forms/Diploma.jsx";
// import AdditionalDetails from "./Forms/AdditionalDetails.jsx";
// import OtherDetails from "./OtherDetails.jsx";

// import logo from "../../../../public/images/nmimslogo.png";

// import { postApi } from "../../../Utils/API.js";
// import { SERVER_URL, STUDENT_PATH } from "../../../Utils/URLPath.jsx";
// import Loader from "../../../Components/Loader.jsx";
// import { Toast } from "../../../Components/Toast.jsx";

// const Register = () => {
//   const methods = useForm();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(0);

//   const nextPage = async () => {
//     const isValid = await methods.trigger(); // Trigger validation for the current page
//     if (isValid) {
//       setPage((prev) => prev + 1);
//     }
//   };

//   const prevPage = () => setPage((prev) => prev - 1);

//   const onSubmit = async (data) => {
//     console.log("this is data : ");
 

//     setLoading(true);
//     try {
//       const response = await postApi(
//         data,
//         `${SERVER_URL}/api/student/register`
//       );
//       if (response.statusCode === 200) {
//         toast.success("Registration successful");
//         navigate(`${STUDENT_PATH}/login`);
//       }
//     } catch (error) {
//       toast.error("An error occurred during registration. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderPage = () => {
//     switch (page) {
//       case 0:
//         return <PersonalDetails />;
//       case 1:
//         return <Class10th />;
//       case 2:
//         return <Class12th />;
//       case 3:
//         return <Diploma />;
//       case 4:
//         return <AdditionalDetails />;
//       case 5:
//         return <OtherDetails />;
//       default:
//         return <PersonalDetails />;
//     }
//   };

//   return (
//     <>
//       <Toast />
//       <section className="flex flex-col items-center justify-center bg-gray-100">
//         <div className="rounded-lg shadow-md p-3 w-full">
//           <FormProvider {...methods}>
//             <form onSubmit={methods.handleSubmit(onSubmit)}>
//               {loading ? (
//                 <Loader message="Registering..." />
//               ) : (
//                 <>
//                   <CollegeHeader />

//                   {renderPage()}
//                   <div className="flex justify-between mt-4">
//                     {page > 0 && (
//                       <button
//                         type="button"
//                         className="bg-gray-300 text-gray-700 lg:ml-16 px-4 py-2 rounded-lg"
//                         onClick={prevPage}
//                       >
//                         Previous
//                       </button>
//                     )}
//                     {page < 5 ? (
//                       <button
//                         type="button"
//                         className="bg-blue-600 lg:mr-16 text-white px-8 py-2 rounded-lg ml-auto"
//                         onClick={nextPage}
//                       >
//                         Next
//                       </button>
//                     ) : (
//                       <button
//                         type="submit"
//                         className="bg-green-600 lg:mr-16 text-white px-8 py-2 rounded-lg ml-auto"
//                       >
//                         Submit
//                       </button>
//                     )}
//                   </div>
//                 </>
//               )}
//             </form>
//           </FormProvider>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Register;

// const CollegeHeader = () => {
//   return (
//     <div className="flex flex-col items-center mb-6">
//       <img className="h-20 mb-4" src={logo} alt="logo" />
//       <h1 className="text-2xl font-bold text-gray-900">STUDENT REGISTRATION</h1>
//     </div>
//   );
// };
