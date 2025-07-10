import { apiFetch } from "@helpers/website";
import { useAsyncEffect } from "../../hooks/useAsyncEffect.tsx";
import {
  useAccount,
  useCourses,
  useOrganization,
  useResource,
} from "../../store.tsx";
import type { FormEventHandler } from "react";
import {
  Button,
  Dialog,
  DialogDescription,
  Icon,
  Label,
  Option,
  Select,
  useDialogRef,
} from "@ui/website";
import { SortableList } from "../../components/SortalbeResources.tsx";
import { BlockCourses } from "../../components/BlockCourses.tsx";
import type { Courses } from "@api/website/types";

export default function CoursesPage() {
  const { list: difficultiesList } = useResource("difficulties");
  const { list: statusesList } = useResource("statuses");
  const { list: accessLevelsList } = useResource("accessLevel");
  const { list: coursesList, set: setCourses, add: addCourses } = useCourses();

  // console.log({ difficultiesList, accessLevelsList, statusesList });
  const dialogRef = useDialogRef();

  useAsyncEffect(async () => {
    const data = await apiFetch<Courses[]>("/courses");
    setCourses(data);
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const element = e.currentTarget;
    const form = new FormData(element);
    apiFetch<Courses>("/courses", {
      json: Object.fromEntries(form),
    })
      .then(addCourses)
      .catch((err) => {
        console.error("Error FetchCourse" + err);
      });
    dialogRef.current?.close();
  };

  const handleSubmitModules: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const element = e.currentTarget;
    const form = new FormData(element);
    const res = apiFetch(`/courses/${1}/modules`, {
      json: Object.fromEntries(form),
    });
    console.log(res);
  };

  const handleSubmitLessons: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const element = e.currentTarget;
    const form = new FormData(element);
    const res = apiFetch(`/lessons`, {
      json: Object.fromEntries(form),
    });
    console.log(res);
  };

  return (
    <>
      <div className="max-w-screen-lg m-auto">
        <div className="py-3rem">
          <div className="bg-card text-card-foreground rounded-xl p-4 shadow-opacity-50 border border-border">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold text-primary">Courses</h2>
              <Dialog
                title="Add Access Level"
                ref={dialogRef}
                trigger={
                  <span className="flex items-center gap-2 transition rounded-lg hover:underline cursor-pointer">
                    <Icon name="Add" size={14} />
                    Add Course
                  </span>
                }
              >
                <DialogDescription>
                  Add a course to your organization.
                </DialogDescription>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <fieldset>
                    <Label name="name" label="Name Course" placeholder="Name" />
                  </fieldset>

                  <div className="flex flex-col gap-2">
                    <span> AccessLevel </span>
                    <select
                      className="px-3 py-2 border border-slate-300 rounded"
                      name="accessLevelId"
                      defaultValue={accessLevelsList[0].id}
                    >
                      {accessLevelsList.map((accessLevel) => (
                        <option key={accessLevel.id} value={accessLevel.id}>
                          {accessLevel.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span> Difficulties </span>
                    <select
                      className="px-3 py-2 border border-slate-300 rounded"
                      name="difficultyId"
                      defaultValue={difficultiesList[0].id}
                    >
                      {difficultiesList.map((difficulty) => (
                        <option key={difficulty.id} value={difficulty.id}>
                          {difficulty.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span> Statuses </span>
                    <select
                      className="px-3 py-2 border border-slate-300 rounded"
                      name="statusId"
                      defaultValue={statusesList[0].id}
                    >
                      {statusesList.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginTop: 25,
                      justifyContent: "flex-end",
                    }}
                  >
                    <Button variant="primary" type="submit">
                      "Save Changes"
                    </Button>
                  </div>
                </form>
              </Dialog>
            </div>

            <BlockCourses courses={coursesList.courses} />

            {/* <SortableList
              type="accessLevel"
              items={courses}
              onReorder={(newItems) => {
                console.log(newItems);
              }}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
