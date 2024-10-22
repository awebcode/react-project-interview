import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CourseDetails from "../Courses/CourseDetails";
import { Link } from "react-router-dom";
import Title from "../../common/Title";

const OrderDetails = ({ data }) => {
  const [storedData, setStoredData] = useState({});
  useEffect(() => {
    if (data) {
      setStoredData(data.singleCoursePurchaseData);
    } else {
      localStorage.getItem("purchaseData") &&
        setStoredData(
          JSON.parse(localStorage.getItem("purchaseData"))?.singleCoursePurchaseData
        );
    }
  }, [data]);

  const isEmpty =
    !storedData ||
    (typeof storedData === "object" && Object.keys(storedData).length === 0);

  if (isEmpty) {
    return (
      <div className="w-full p-4 border min-h-screen flex items-center justify-center border-gray-300 rounded-lg">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 flex flex-col items-center">
          No Data Found! Create an order?{" "}
          <Link to="/course" className="text-blue-500 underline text-base">
            Go to Courses
          </Link>
        </h2>
      </div>
    );
  }

  return (
    <>
      <Title title="Latest Purchase Details" className="text-xl md:!text-3xl" />
      <div className="w-full p-4 m-2 border bg-[#D2C5A2] border-gray-300 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x divide-gray-400 gap-4">
          {/* Column 1 */}
          <div className="space-y-2 md:pr-4">
            <p>
              <strong>Name:</strong> {storedData.name}
            </p>
            <p>
              <strong>Father&apos;s Name:</strong> {storedData.father_name}
            </p>
            <p>
              <strong>Email:</strong> {storedData.email}
            </p>
            <p>
              <strong>Phone:</strong> {storedData.phone_no}
            </p>
            <p>
              <strong>Address:</strong> {storedData.present_address}
            </p>
            <p>
              <strong>NID:</strong> {storedData.nid_no}
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-2 md:pl-4">
            <p>
              <strong>Admission Date:</strong> {storedData.admission_date}
            </p>
            <p>
              <strong>Father&apos;s Phone:</strong> {storedData.father_phone_no}
            </p>
            <p>
              <strong>School/College:</strong> {storedData.school_collage_name}
            </p>
            <p>
              <strong>Gender:</strong> {storedData.gender}
            </p>
            <p>
              <strong>Job Title:</strong> {storedData.job_title}
            </p>
            <p>
              <strong>Guardian&apos;s Phone:</strong> {storedData.local_guardian_phone_no}
            </p>
          </div>
        </div>
      </div>
      {/* Course Details */}
      <CourseDetails
        course={{
          student_name: storedData.name,
          quantity: storedData.course_qty,
          ...storedData?.course_data,
        }}
      />
    </>
  );
};

OrderDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default OrderDetails;
