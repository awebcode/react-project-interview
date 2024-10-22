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

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="">
      <Title title="Courses" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {data &&
          data.courseData.map((course) => (
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
    </div>
  );
};

export default Courses;
