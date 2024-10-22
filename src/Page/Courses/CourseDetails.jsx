import PropTypes from "prop-types";
const CourseDetails = ({ course }) => {
  return (
    <div className="w-full p-4 overflow-x-auto border border-gray-300  rounded-lg shadow-md mt-8">
      <h2 className="text-xl font-semibold mb-4">Course Details</h2>
      <table className="w-full table-auto border-collapse border border-gray-400">
        <thead>
          <tr className="bg-white">
            <th className="border border-gray-300 p-4">Image</th>
            <th className="border border-gray-300 p-4">Course Name</th>
            <th className="border border-gray-300 p-4">Student Name</th>
            <th className="border border-gray-300 p-4">Quantity</th>
            <th className="border border-gray-300 p-4">Price</th>
            <th className="border border-gray-300 p-4">Total</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr>
            <td className="border  border-gray-300 p-4">
              <img
                src={course.photo}
                alt={course.course_name}
                className="w-16 h-16 rounded-md"
              />
            </td>
            <td className="border border-gray-300 p-4">{course.course_name}</td>
            <td className="border border-gray-300 p-4">{course.student_name}</td>
            <td className="border border-gray-300 p-4">{course.quantity}</td>

            <td className="border border-gray-300 p-4">{course.discount_price}</td>
            <td className="border border-gray-300 p-4">{course.discount_price}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

CourseDetails.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseDetails;
