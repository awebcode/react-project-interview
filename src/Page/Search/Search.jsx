// components/SearchPurchaseForm.jsx
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { searchFormSchema } from "../../schemas/checkoutSchema";
import { searchPurchaseForm } from "../../services/course";
import Title from "../../common/Title";
import Input from "../../common/Input";
import OrderDetails from "../OrderDetails/OrderDetails";

const Search = () => {
  const methods = useForm({
    resolver: zodResolver(searchFormSchema),
    mode: "all",
  });

  const { reset, handleSubmit, control } = methods;
  const [searchParams] = useSearchParams();
  const [purchaseData, setPurchaseData] = useState(null); // State to hold purchase data

  const formNo = searchParams.get("form_no") || ""; // Default to an empty string if not found
  const phoneNo = searchParams.get("phone_no") || ""; // Default to an empty string if not found

  // Mutation to search for purchase data
  const mutation = useMutation({
    mutationFn: searchPurchaseForm,
    onSuccess: (data) => {
      // toast.success("Purchase found!");
      setPurchaseData(data); // Store purchase data in state
      localStorage.setItem("purchaseData", JSON.stringify(data));
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
      setPurchaseData(null); // Clear previous data on error
    },
  });
  // Function to handle the search
  const handleSearch = useCallback(
    (data) => {
      mutation.mutate(data);
    },
    [mutation]
  );
  // Effect to handle pre-populating form and searching on URL change
  useEffect(() => {
    if (formNo && phoneNo) {
      reset({ form_no: formNo, phone_no: phoneNo });
      handleSearch({ form_no: formNo, phone_no: phoneNo });
    } else {
      localStorage.getItem("purchaseData") &&
        setPurchaseData(JSON.parse(localStorage.getItem("purchaseData")));
    }
  }, [formNo, phoneNo, reset]);

  const onSubmit = (data) => {
    handleSearch(data);
  };
  return (
    <FormProvider {...methods}>
      <Title title="Search Purchase" className="text-center" />
      <form onSubmit={handleSubmit(onSubmit)} className="container max-w-md mx-auto">
        <Input name="form_no" label="Form Number" type="text" control={control} />
        <Input name="phone_no" label="Phone Number" type="text" control={control} />
        <button
          className="btn btn-primary w-full mt-4"
          type="submit"
          disabled={mutation.isPending} // Use isPending for clarity
        >
          {mutation.isPending ? (
            <div className="flex items-center gap-2">
              <span className="loading loading-spinner"></span>
              Searching...
            </div>
          ) : (
            "Search"
          )}
        </button>
      </form>

      {purchaseData && (
        <div className="mt-6 p-4 border rounded-lg">
          <OrderDetails data={purchaseData} />
        </div>
      )}
    </FormProvider>
  );
};

export default Search;
