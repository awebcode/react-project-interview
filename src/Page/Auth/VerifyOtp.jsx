// VerifyOTP.jsx
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { verifyOtp } from "../../services/auth";
import { toast } from "react-toastify";
import Input from "../../common/Input";
import { otpSchema } from "../../schemas/authSchemas";
import Title from "../../common/Title";
import { Link } from "react-router-dom";

const VerifyOTP = () => {
  const methods = useForm({
    resolver: zodResolver(otpSchema),
    mode: "all",
  });
  const { handleSubmit, control } = methods;

  const mutation = useMutation({
    mutationFn: verifyOtp,
    onSuccess: () => {
      toast.success("OTP verified successfully");
    },
    onError: (error) => {
      toast.error(error?.response?.data.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <Title title="Verify OTP" className="text-center" />

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <Input name="email" label="Email" type="email" control={control} />
        <Input name="verify_code" label="OTP" type="text" control={control} />
        <button
          className="btn btn-primary w-full mt-4"
          type="submit"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? (
            <div className="flex items-center gap-2">
              {" "}
              <span className="loading loading-spinner"></span>
              Verifying...
            </div>
          ) : (
            "Verify OTP"
          )}
        </button>
        <p className="text-center mt-4">
          Don&apos;t need verify?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default VerifyOTP;
