import api from "../config/Base_Api";

// Get Course List
export const getCoursesList = async (data) => {
  const response = await api.get("/api/get-course-list", data);
  return response.data;
};

//save purchase form
export const savePurchaseForm = async (data) => {
  const response = await api.post("/api/course-purchase", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

//search purchase form
export const searchPurchaseForm = async (data) => {
  const response = await api.post("/api/search-purchase-data", data);
  return response.data;
};
