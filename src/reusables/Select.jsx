import { useFormContext } from "react-hook-form";
import propTypes from "prop-types";
const Select = ({ name, label, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-4 w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        {...register(name)}
        className={`select select-primary mt-1 block w-full border rounded-md ${
          errors[name] ? "border-red-500" : "border-gray-300"
        } p-2`}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name]?.message}</p>
      )}
    </div>
  );
};

Select.propTypes = {
  name: propTypes.string.isRequired,
  label: propTypes.string.isRequired,
  options: propTypes.array.isRequired,
};

export default Select;
