import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "../../schemas/checkoutSchema";
import Input from "../../common/Input";
import Select from "../../common/Select";
import Title from "../../common/Title";
import ImageInput from "../../common/ImageInput";
import { genderOptions, bloodGroupOptions } from "../../common/DATA";
import { useMutation } from "@tanstack/react-query";
import { savePurchaseForm } from "../../services/course";
import { toast } from "react-toastify";
import useCartStore from "../../Hooks/useCartStore";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../Cart/Cart";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const { getCartItems, getTotalPrice, clearCart } = useCartStore();

  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "all",
  });
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationFn: savePurchaseForm,
    onSuccess: (data) => {
      // console.log({ serverResponse: data });

      toast.success("Form submitted successful");
      clearCart();

      navigate(
        "/search?form_no=" +
          data.coursePurchaseData.form_no +
          "&phone_no=" +
          data.coursePurchaseData.phone_no
      );

      // Handle successful registration (e.g., navigate to login)
    },
    onError: (error) => {
      toast.error(error?.response?.data.message || "Something went wrong");
      // Handle registration error (e.g., display error message)
    },
  });
  //
  const onSubmit = (data) => {
    // console.log({data,cartItems:getCartItems()})
    const formData = new FormData();

    // Add courseId from cart[0] to the FormData
    const courseId = getCartItems()[0]?.id; // Assuming course ID is available in cart[0]
    formData.append("course_id", courseId);
    formData.append("admission_date", new Date().toISOString());
    formData.append("photo", data.studentPhoto); // File input handling
    formData.append("name", data.name);
    formData.append("father_name", data.fatherMotherName);
    formData.append("father_phone_no", data.fatherMotherPhone);
    formData.append("school_collage_name", data.schoolCollegeName);
    formData.append("job_title", data.jobTitle);
    formData.append("email", data.email);
    formData.append("gender", data.gender);
    formData.append("present_address", data.presentAddress);
    formData.append("permanent_address", data.permanentAddress);
    formData.append("nid_no", data.nidNo);
    formData.append("phone_no", data.phone);
    formData.append("local_guardian_name", data.localGuardianName);
    formData.append("local_guardian_phone_no", data.localGuardianPhone);
    formData.append("date_of_birth", data.dateOfBirth);
    formData.append("blood_group", data.bloodGroup);
    formData.append("course_fee", parseInt(getTotalPrice()));
    formData.append("course_qty", getCartItems().length);
    formData.append("total_course_fee", parseInt(getTotalPrice()));
    formData.append("discount_course_fee", parseInt(getTotalPrice()));
    formData.append("sub_total_course_fee", parseInt(getTotalPrice()));

    mutation.mutate(formData); // Submit form data
    // Handle form submission (e.g., API call)
  };

  const onImageUpload = (file) => {
    setValue("studentPhoto", file); // Register the image in the form state
  };

  // if (formData) {
  //   return JSON.stringify(formData);
  // }

  return (
    <div className="py-4 px-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-4 ${getCartItems().length < 1 && "cursor-not-allowed"}`}
      >
        <FormProvider {...methods}>
          <Title title="Checkout" />

          {/* name / email / phone */}
          <div className="flex w-full  items-center justify-center flex-wrap md:flex-nowrap gap-2">
            <Input name="name" label="Name*" type="text" />{" "}
            <Input name="email" label="Email*" type="email" />{" "}
            <Input name="phone" label="Phone No*" type="text" />
          </div>

          {/* fatherMotherName/ fatherMotherPhone / schoolCollegeName*/}

          <div className="flex w-full  items-center justify-center gap-2 flex-wrap md:flex-nowrap">
            <Input name="fatherMotherName" label="Father/Mother Name*" type="text" />
            <Input name="fatherMotherPhone" label="Father/Mother Phone*" type="text" />
            <Input name="schoolCollegeName" label="School/College Name*" type="text" />
          </div>

          {/* jobTitle /localGuardianName/localGuardianPhone  */}

          <div className="flex w-full  items-center justify-center gap-2 flex-wrap md:flex-nowrap">
            {" "}
            <Input name="jobTitle" label="Job Title*" type="text" />
            <Input name="localGuardianName" label="Local Guardian Name*" type="text" />
            <Input name="localGuardianPhone" label="Local Guardian Phone*" type="text" />
          </div>

          {/* nid/birth */}

          <div className="flex w-full  items-center justify-center gap-2 flex-wrap md:flex-nowrap">
            <Input name="nidNo" label="NID No*" type="text" {...register("nidNo")} />
            <Input
              name="dateOfBirth"
              label="Date Of Birth*"
              type="text"
              placeholder="YYYY-MM-DD"
            />
          </div>

          {/* gender /bloodGroup */}

          <div className="flex w-full  items-center justify-center gap-2 flex-wrap md:flex-nowrap">
            <Select name="gender" label="Gender*" options={genderOptions} />
            <Select name="bloodGroup" label="Blood Group*" options={bloodGroupOptions} />
          </div>

          {/* address */}

          <div className="flex w-full  items-center justify-center gap-2 flex-wrap md:flex-nowrap">
            {" "}
            <Input name="presentAddress" label="Present Address*" type="text" />
            <Input name="permanentAddress" label="Permanent Address*" type="text" />
          </div>
          <div className="w-full">
            <ImageInput
              onImageUpload={onImageUpload}
              name="studentPhoto"
              register={register}
              error={errors.studentPhoto}
              clearErrors={clearErrors}
            />
          </div>
          {/* photo end */}
        </FormProvider>
        {/* Card */}
        {getCartItems().length === 0 && (
          <div className="w-full flex justify-center items-center py-10">
            <p className="text-center text-lg font-semibold">
              No item in the cart.{" "}
              <Link to="/course" className="text-blue-500">
                Please add some items first to checkout.
              </Link>
            </p>
          </div>
        )}
        {getCartItems().length > 0 && (
          <Cart
            parentButton={
              <>
                <button
                  type="submit"
                  className="btn btn-primary w-full mt-4"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <div className="flex items-center gap-2">
                      {" "}
                      <span className="loading loading-spinner"></span>
                      Submitting...
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
                <Link className="text-blue-400 mt-2 block underline" to="/search">
                  Purchase Items
                </Link>
              </>
            }
          />
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
