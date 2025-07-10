import type { Courses } from "@api/website/types";

type Params = {
  courses: Courses[];
};

export function BlockCourses({ courses }: Params) {
  console.log(courses);
  return (
    <div className="grid grid-cols-1 gap-1rem ">
      {courses.map((course) => (
        <div
          key={course.id}
          className="border-b border-b-black/20 nth-last:border-b-none"
        >
          <h1 className="text-xl font-bold ">{course.name}</h1>
        </div>
      ))}
    </div>
  );
}
