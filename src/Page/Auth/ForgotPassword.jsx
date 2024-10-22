import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Input from "../../reusables/Input";
import Title from "../../reusables/Title";
import { forgotPasswordSchema } from "../../schemas/authSchemas"; // Ensure you have this schema for validation
import { forgotPassword } from "../../services/auth"; // Update this service to handle forgot password

const ForgotPassword = () => {
  const methods = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "all",
  });

  const { handleSubmit, control } = methods;

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      toast.success("Password reset link sent to your email.");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "An error occurred");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <Title title="Forgot Password" className="text-center" />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <Input name="email" label="Email" type="email" control={control} />

        <button
          className="btn btn-primary w-full mt-4"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner"></span>
              Sending...
            </div>
          ) : (
            "Send Reset Link"
          )}
        </button>

        <div className="flex text-center items-center justify-between gap-2 px-2 mt-2">
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Back to Login
          </Link>
        </div>
      </form>
    </FormProvider>
  );
};

export default ForgotPassword;
