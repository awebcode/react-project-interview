// components/SearchPurchaseForm.jsx
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Input from "../../reusables/Input";
import Title from "../../reusables/Title";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchPurchaseForm } from "../../services/course";
import { searchFormSchema } from "../../schemas/checkoutSchema";

const SearchPurchaseForm = () => {
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
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong");
      setPurchaseData(null); // Clear previous data on error
    },
  });

  // Effect to handle pre-populating form and searching on URL change
  useEffect(() => {
    if (formNo && phoneNo) {
      reset({ form_no: formNo, phone_no: phoneNo });
      handleSearch({ form_no: formNo, phone_no: phoneNo });
    }
  }, [formNo, phoneNo, reset]);

  // Function to handle the search
  const handleSearch = (data) => {
    mutation.mutate(data);
  };

  const onSubmit = (data) => {
    handleSearch(data);
  };

  return (
    <FormProvider {...methods}>
      <Title title="Search Purchase" />
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <Input name="form_no" label="Form Number" type="text" control={control} />
        <Input name="phone_no" label="Phone Number" type="text" control={control} />
        <button
          className="btn btn-primary w-full mt-4"
          type="submit"
          disabled={mutation.isLoading} // Use isLoading for clarity
        >
          {mutation.isLoading ? (
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
        <div className="mt-6 p-4 border rounded-lg bg-gray-200">
          <h2 className="text-lg font-semibold">Purchase Data:</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-900">
            {JSON.stringify(purchaseData, null, 2)} {/* Pretty print JSON */}
          </pre>
        </div>
      )}
    </FormProvider>
  );
};

export default SearchPurchaseForm;
