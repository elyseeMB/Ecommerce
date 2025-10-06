import type { Courses } from "@api/website/types";
import type { FormEventHandler } from "react";
import { SortableListCourses } from "./SortalbeCourses.tsx";

type Params = {
  courses: Courses[];
};

export function BlockCourses({ courses }: Params) {
  return (
    <div className="grid grid-cols-1 gap-1rem ">
      <SortableListCourses
        type="courses"
        onReorder={(newItems) => {
          console.log(newItems);
        }}
        items={courses}
      />
    </div>
  );
}
