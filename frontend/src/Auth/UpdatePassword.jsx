// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate, useParams } from "react-router-dom";
// import { FaRegEye, FaEyeSlash } from "react-icons/fa";
// import logo from "../../public/images/nmimslogo.png";
// import Loader from "../Components/Loader"; // Adjust the import path as needed
// import { postApi } from "../Utils/API.js";
// const UpdatePassword = () => {
//   // Set up react-hook-form
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm();

//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false); // Add loading state

//   const togglePasswordVisibility = () => {
//     setShowPassword((prevShowPassword) => !prevShowPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(
//       (prevShowConfirmPassword) => !prevShowConfirmPassword
//     );
//   };

//   const param = useParams();

//   const onSubmit = async (data) => {
//     alert(param.email);
//     setLoading(true); // Set loading to true

//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/admin/update-password/${param.email}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             password: data.password,
//             confirmPassword: data.confirmPassword,
//           }),
//         }
//       );

//       const result = await response.json();

//       if (response.ok) {
//         // Handle successful password update
//         alert("Password updated successfully!"); // Use a notification library or custom message
//         navigate("/login"); // Navigate to login or another page after successful update
//       } else {
//         alert(`Failed to update password: ${result.message}`);
//       }
//     } catch (error) {
//       console.error("Error updating password:", error);
//       alert("An error occurred while updating the password.");
//     } finally {
//       setLoading(false); // Set loading to false after the request is complete
//     }
//   };

//   return (
//     <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//       <div className="flex flex-col items-center mb-6">
//         <img className="h-20 mb-4" src={logo} alt="logo" />
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
//         {loading && <Loader />} {/* Display loader when loading */}
//         <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <label
//               htmlFor="password"
//               className="block mb-2 text-sm font-medium text-gray-900"
//             >
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 id="password"
//                 placeholder="Enter new password"
//                 className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
//                   errors.password ? "border-red-500" : ""
//                 }`}
//                 {...register("password", {
//                   required: "Password is required",
//                   minLength: {
//                     value: 8,
//                     message: "Password must be at least 8 characters long",
//                   },
//                 })}
//               />
//               <span
//                 onClick={togglePasswordVisibility}
//                 className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaRegEye />}
//               </span>
//             </div>
//             {errors.password && (
//               <span className="text-red-500 text-sm">
//                 {errors.password.message}
//               </span>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="confirmPassword"
//               className="block mb-2 text-sm font-medium text-gray-900"
//             >
//               Confirm Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 id="confirmPassword"
//                 placeholder="Confirm your password"
//                 className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
//                   errors.confirmPassword ? "border-red-500" : ""
//                 }`}
//                 {...register("confirmPassword", {
//                   required: "Confirm password is required",
//                   validate: (value) =>
//                     value === watch("password") || "Passwords do not match",
//                 })}
//               />
//               <span
//                 onClick={toggleConfirmPasswordVisibility}
//                 className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
//               >
//                 {showConfirmPassword ? <FaEyeSlash /> : <FaRegEye />}
//               </span>
//             </div>
//             {errors.confirmPassword && (
//               <span className="text-red-500 text-sm">
//                 {errors.confirmPassword.message}
//               </span>
//             )}
//           </div>

//           <button
//             type="submit"
//             className="w-full text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700"
//           >
//             Update Password
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default UpdatePassword;
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import logo from "../../public/images/nmimslogo.png";
import Loader from "../Components/Loader"; // Adjust the import path as needed
import { postApi } from "../Utils/API"; // Adjust the import path as needed
import { toast } from "react-toastify"; // Import react-toastify for notifications
import { Toast } from "../Components/Toast.jsx";
import { BASE_API_URL } from "../Utils/URLPath.jsx";
const UpdatePassword = () => {
  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();
  const { email } = useParams(); // Use destructuring to get email from params
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  const onSubmit = async (data) => {
    setLoading(true); // Set loading to true

    try {
      const response = await postApi(
        {
          password: data.password,
        },
        `${BASE_API_URL}/api/admin/update-password/${email}`
      );

      console.log(response.data);

      if (response.success) {
        toast.success("Password updated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(`Failed to update password: ${response.message}`);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("An error occurred while updating the password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast />
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center mb-6">
          <img className="h-20 mb-4" src={logo} alt="logo" />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter new password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                  })}
                />
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaRegEye />}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaRegEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {loading ? (
              <>
                <Loader message={"Updating..."} />
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-700"
                >
                  Update Password
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

export default UpdatePassword;
