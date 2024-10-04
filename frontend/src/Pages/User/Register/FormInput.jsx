import React, { useState } from "react";

export const FormInput = ({
  id,
  label,
  type = "text",
  placeholder,
  register,
  validation,
  errors,
  options = [],
  onChange,
  multiple = false,
  accept = "",
}) => {
  const [fileName, setFileName] = useState(placeholder);

  return (
    <div>
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-600"
      >
        {label}
        {validation?.required && <span className="text-red-500">*</span>}
      </label>

      {type === "select" ? (
        <select
          id={id}
          className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
            errors[id] ? "border-red-500" : ""
          }`}
          {...register(id, validation)}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === "file" ? (
        <div className="relative">
          <input
            type="file"
            id={id}
            className="hidden"
            {...register(id, validation)}
            multiple={multiple}
            accept={accept}
          />

          <label
            htmlFor={id}
            className={`bg-gray-50 border border-gray-300 ${
              fileName === "Choose a file" ? "text-black" : "text-blue-500"
            } rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 cursor-pointer ${
              errors[id] ? "border-red-500" : ""
            }`}
          >
            {fileName}
          </label>
        </div>
      ) : (
        <>
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
              errors[id] ? "border-red-500" : ""
            }`}
            {...register(id, validation)}
          />
        </>
      )}
      {errors[id] && (
        <span className="text-red-500 text-sm">{errors[id].message}</span>
      )}
    </div>
  );
};




























































