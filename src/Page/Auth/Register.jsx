// Register.jsx
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/auth";
import { registerSchema } from "../../schemas/authSchemas";
import { toast } from "react-toastify";
import Select from "../../reusables/Select";
import Title from "../../reusables/Title";
import Input from "../../reusables/Input";
import { Link } from "react-router-dom";
import { genderOptions, roleOptions } from "../../reusables/DATA";
const Register = () => {
  const methods = useForm({
    resolver: zodResolver(registerSchema),
    mode: "all",
  });

  const { handleSubmit, control } = methods;

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Registration successful");
      // Handle successful registration (e.g., navigate to login)
    },
    onError: (error) => {
      toast.error(error?.response?.data.message);
      // Handle registration error (e.g., display error message)
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({ password_confirmation: data.confirmPassword, ...data });
  };
  
  return (
    <FormProvider {...methods}>
      <Title title="Register" className="text-center" />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <Input name="name" label="Name" type="text" control={control} />
        <Input name="mobile" label="Mobile" type="text" control={control} />
        <Input name="email" label="Email" type="email" control={control} />
        <Input name="password" label="Password" type="password" control={control} />
        <Input
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          control={control}
        />
        <Select name="role" label="Role" options={roleOptions} />
        <Select name="gender" label="Gender" options={genderOptions} />
        {/* Adjust to use select if needed */}
        <Input name="address" label="Address" type="text" control={control} />
        <button
          className="btn btn-primary w-full mt-4"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <div className="flex items-center gap-2">
              {" "}
              <span className="loading loading-spinner"></span>
              Registering...
            </div>
          ) : (
            "Register"
          )}
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default Register;
