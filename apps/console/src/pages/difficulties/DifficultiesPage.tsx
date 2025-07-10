import { useCallback, useEffect, type FormEventHandler } from "react";
import { useResource } from "../../store.tsx";
import {
  Button,
  Dialog,
  DialogDescription,
  Icon,
  Label,
  Skeleton,
  useDialogRef,
} from "@ui/website";
import type { Difficulties } from "@api/website/types";
import { SortableList } from "../../components/SortalbeResources.tsx";
import { useFetchResource } from "../../hooks/resource/useFetchResource.ts";

export default function DifficultiesPage() {
  const {
    list: difficultiesList,
    set: setDifficulties,
    add: addDifficulties,
  } = useResource("difficulties");
  const [handle, isLoading] = useFetchResource("difficulties");
  const dialogRef = useDialogRef();

  const fetchDifficulties = useCallback(() => {
    handle({
      method: "GET",
      onCompleted: setDifficulties,
    });
  }, [setDifficulties]);

  useEffect(() => {
    if (difficultiesList.length === 0) {
      fetchDifficulties();
    }
  }, [difficultiesList]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    handle({
      method: "POST",
      data: data,
      onCompleted: addDifficulties,
    })
      .catch((err) => console.error(err))
      .finally(() => {
        dialogRef.current?.close();
      });
  };

  const handleReorder = useCallback(
    (newItems: Difficulties[]) => {
      const ids = newItems.map((item) => item.id);
      handle({
        method: "ORDER",
        data: { ids },
        onCompleted: setDifficulties,
      }).catch((err) => console.error(err));
    },
    [setDifficulties],
  );

  return (
    <div className="max-w-screen-sm m-auto">
      <div className="py-3rem">
        <div className="bg-card text-card-foreground rounded-xl p-4 shadow-opacity-50 border border-border">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Difficulties</h2>
            <Dialog
              title="Add Difficulties"
              ref={dialogRef}
              trigger={
                <span className="flex items-center gap-2 transition rounded-lg hover:underline cursor-pointer">
                  <Icon name="Add" size={14} />
                  Add Difficulties
                </span>
              }
            >
              <DialogDescription>
                Add a Difficulty level to your organization.
              </DialogDescription>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <fieldset>
                  <Label
                    name="name"
                    label="Name Diffiulty"
                    placeholder="Name"
                  />
                </fieldset>

                <fieldset>
                  <Label
                    type="color"
                    name="color"
                    label="Color Diffiulty"
                    placeholder="Color"
                  />
                </fieldset>

                <div
                  style={{
                    display: "flex",
                    marginTop: 25,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button disabled={isLoading} variant="primary" type="submit">
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Dialog>
          </div>

          {isLoading ? (
            <Skeleton type="card" />
          ) : (
            <SortableList
              type="difficulties"
              items={difficultiesList}
              onReorder={(newItems) => {
                handleReorder(newItems);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
