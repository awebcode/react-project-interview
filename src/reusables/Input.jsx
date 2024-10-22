import { useFormContext } from "react-hook-form";
import propTypes from "prop-types";
import { useState } from "react";
import { IoEyeOff } from "react-icons/io5";
import { FaEye } from "react-icons/fa";

const Input = ({ name, label, type = "text", ...rest }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  // Determine input type based on the field name
  const isPasswordType =
    name.toLowerCase().includes("password") && isPasswordVisible ? "text" : type;
  return (
    <div className="mb-4 w-full ">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          {...register(name)}
          type={isPasswordType}
          {...rest}
          className={`input mt-1 block w-full border rounded-md ${
            errors[name] ? "border-red-500" : "border-gray-300"
          } p-2`}
        />
        {/* Eye icon to toggle password visibility */}
        {name.toLowerCase().includes("password") && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-2 top-1/2 transform -translate-y-1/2  focus:outline-none"
          >
            {isPasswordVisible ? (
              <IoEyeOff size={24} className="text-gray-600" />
            ) : (
              <FaEye size={24} className="text-gray-600" />
            )}
          </button>
        )}
      </div>

      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  );
};

Input.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  type: propTypes.string,
};

export default Input;
