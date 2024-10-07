import { useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { FiEdit3 } from "react-icons/fi";
import { RxCross1, RxPadding } from "react-icons/rx";

import { BsPersonWorkspace } from "react-icons/bs";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "500px", // Default width for larger screens
    maxHeight: "600px", // Set max height
    overflowY: "auto", // Allow scrolling for overflow content
    padding: "20px", // Added padding
  },
};

// Adjust styles for mobile view
if (typeof window !== "undefined" && window.innerWidth < 768) {
  customStyles.content.width = "90%";
  customStyles.content.top="60%"
  // Use 90% width for mobile
}

// Domain Options
const domainOptions = [
  { value: "Web Development", label: "Web Development" },
  { value: "App Development", label: "App Development" },
  { value: "IOT", label: "Internet of Things (IOT)" },
  { value: "AI", label: "Artificial Intelligence (AI)" },
  { value: "ML", label: "Machine Learning (ML)" },
  { value: "Block Chain", label: "Block Chain" },
  { value: "Cyber Security", label: "Cyber Security" },
  { value: "Other", label: "Other" },
];

// Duration Options
const durationOptions = [
  { value: "1 Month", label: "1 Month" },
  { value: "2 Months", label: "2 Months" },
  { value: "3 Months", label: "3 Months" },
  { value: "4 Months", label: "4 Months" },
  { value: "5 Months", label: "5 Months" },
  { value: "6 Months", label: "6 Months" },
  { value: "More", label: "More" },
];

// Paid/Unpaid Options
const paymentOptions = [
  { value: "Paid", label: "Paid" },
  { value: "Unpaid", label: "Unpaid" },
];

export const InternshipAndExperienceDetails = ({ studentData }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      ...studentData,
    },
  });

  // Open the modal
  const openModal = () => {
    setIsOpen(true);
  };

  // Close the modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Handle form submission
  const onSubmit = (data) => {
 
    closeModal();
  };

  return (
    <>
      <h3 className="font-serif w-full font-bold text-lg text-gray-800 flex-shrink-0 pr-4 py-4">
        <div className="flex w-full justify-between gap-3 items-center">
          <div className="flex gap-5 items-center">
            <BsPersonWorkspace size={30} />
            Internship and Experience
          </div>
          <FiEdit3
            size={25}
            className="cursor-pointer hover:text-gray-600"
            onClick={openModal}
          />
        </div>
      </h3>
      <div className="flex-grow border-t border-gray-300 mb-4"></div>

      <div>No Internship and Experience</div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Edit Internship and Experience Details"
        ariaHideApp={false}
      >
        <div className="flex justify-between">
          <h2 className="font-serif font-bold text-xl mb-10">
            Edit Internships
          </h2>
          <RxCross1 size={30} onClick={closeModal} />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="font-serif">
          <div className="space-y-8">
            {/* Internship Block 1 */}
            <div className="border p-4 rounded-lg bg-gray-100">
              <h3 className="font-bold text-lg mb-4">Internship 1</h3>
              <label className="block mb-2">
                Internship Name:
                <input
                  type="text"
                  {...register("internship1_name")}
                  className="border rounded p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Company Name:
                <input
                  type="text"
                  {...register("internship1_company_name")}
                  className="border rounded p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Your Role:
                <input
                  type="text"
                  {...register("internship1_role")}
                  className="border rounded p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Domain:
                <select
                  {...register("internship1_domain")}
                  className="border rounded p-2 w-full"
                >
                  {domainOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Company Location:
                <input
                  type="text"
                  {...register("internship1_location")}
                  className="border rounded p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Duration:
                <select
                  {...register("internship1_duration")}
                  className="border rounded p-2 w-full"
                >
                  {durationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Paid or Unpaid:
                <select
                  {...register("internship1_paid_unpaid")}
                  className="border rounded p-2 w-full"
                >
                  {paymentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Internship Block 2 */}
            <div className="border p-4 rounded-lg bg-gray-100">
              <h3 className="font-bold text-lg mb-4">Internship 2</h3>
              <label className="block mb-2">
                Internship Name:
                <input
                  type="text"
                  {...register("internship2_name")}
                  className="border rounded p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Company Name:
                <input
                  type="text"
                  {...register("internship2_company_name")}
                  className="border rounded p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Your Role:
                <input
                  type="text"
                  {...register("internship2_role")}
                  className="border rounded p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Domain:
                <select
                  {...register("internship2_domain")}
                  className="border rounded p-2 w-full"
                >
                  {domainOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Company Location:
                <input
                  type="text"
                  {...register("internship2_location")}
                  className="border rounded p-2 w-full"
                />
              </label>
              <label className="block mb-2">
                Duration:
                <select
                  {...register("internship2_duration")}
                  className="border rounded p-2 w-full"
                >
                  {durationOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block mb-2">
                Paid or Unpaid:
                <select
                  {...register("internship2_paid_unpaid")}
                  className="border rounded p-2 w-full"
                >
                  {paymentOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="flex items-center mt-10 gap-10">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
