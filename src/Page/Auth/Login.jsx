import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginSchema } from "../../schemas/authSchemas";
import { loginUser } from "../../services/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Input from "../../reusables/Input";
import Title from "../../reusables/Title";

const Login = () => {
  const methods= useForm({
    resolver: zodResolver(loginSchema),
    mode:"all"
  });
  const { handleSubmit, control } = methods;

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log({data})
      toast.success("Login successful");
    },
    onError: (error) => {
      console.log({error})
      toast.error(error?.response?.data.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <Title title="Login" className="text-center" />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <Input name="email" label="Email" type="email" control={control} />
        <Input name="password" label="Password" type="password" control={control} />
        <button
          className="btn btn-primary w-full mt-4"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <div className="flex items-center gap-2">
              {" "}
              <span className="loading loading-spinner"></span>
              Login in...
            </div>
          ) : (
            "Login"
          )}
        </button>
        <div className="flex text-center items-center justify-between gap-2 px-2 mt-2">
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Register
          </Link>
          <div className="flex flex-col items-center">
            <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700">
              Forgot Password
            </Link>

            <Link to="/verify-otp" className="text-blue-500 hover:text-blue-700">
              Verify OTP
            </Link>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Login;
