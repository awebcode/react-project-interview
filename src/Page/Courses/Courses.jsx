import { useState, useEffect } from "react";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css"; // Import default styles
import locale from "rc-pagination/lib/locale/en_US"; // Localization
import Title from "../../common/Title";
import { getCoursesList } from "../../services/course";
import Loader from "../../Utils/Loader/Loader";
import CourseCard from "./CourseCard";
import { useQuery } from "@tanstack/react-query";

const Courses = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["courses"],
    queryFn: getCoursesList,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(6); // Fixed items per page
  const [paginatedData, setPaginatedData] = useState([]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Update paginated data based on the current page
  useEffect(() => {
    if (data) {
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      setPaginatedData(data.courseData.slice(startIndex, endIndex));
    }
  }, [data, currentPage, perPage]);

  if (isError) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto p-4">
      <Title title="Courses" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        {paginatedData.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            course_name={course.course_name}
            course_qty={course.course_qty}
            trainer={course.trainer_data?.name || course.trainer}
            regular_price={course.regular_price}
            discount_price={course.discount_price}
            photo={course.photo}
          />
        ))}
      </div>

      {/* Pagination Component */}
      <div className="flex justify-center items-center mt-4">
        <Pagination
          current={currentPage}
          total={data?.courseData.length || 0}
          pageSize={perPage}
          onChange={handlePageChange}
          locale={locale}
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} courses`}
          showQuickJumper
          showLessItems
          showTitle
          showPrevNextJumpers
          hideOnSinglePage
          className="custom-pagination"
          nextIcon=">>"
          prevIcon="<<"
          jumpPrevIcon=">>>"
          jumpNextIcon="<<<"
        />
      </div>
    </div>
  );
};

export default Courses;
