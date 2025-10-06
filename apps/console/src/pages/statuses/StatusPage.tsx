import { useCallback, useEffect, type FormEventHandler } from "react";
import { useResource } from "../../store.tsx";
import { SortableList } from "../../components/SortalbeResources.tsx";
import {
  Button,
  Dialog,
  DialogDescription,
  Icon,
  Label,
  useDialogRef,
} from "@ui/website";
import type { Statuses } from "@api/website/types";
import { useFetchResource } from "../../hooks/resource/useFetchResource.ts";

export default function StatusesPage() {
  const {
    list: statusesList,
    set: setStatuses,
    add: addStatuses,
  } = useResource("statuses");
  const [handle, isLoading] = useFetchResource("statuses");
  const dialogRef = useDialogRef();

  const fetchDifficulties = useCallback(() => {
    handle({
      method: "GET",
      onCompleted: setStatuses,
    });
  }, [setStatuses]);

  useEffect(() => {
    if (statusesList.length === 0) {
      fetchDifficulties();
    }
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    handle({
      method: "POST",
      data: data,
      onCompleted: addStatuses,
    })
      .catch((err) => console.error(err))
      .finally(() => {
        dialogRef.current?.close();
      });
  };

  const handleReorder = useCallback(
    (newItems: Statuses[]) => {
      const ids = newItems.map((item) => item.id);
      handle({
        method: "ORDER",
        data: { ids },
        onCompleted: setStatuses,
      }).catch((err) => console.error(err));
    },
    [setStatuses],
  );
  return (
    <div className="max-w-screen-sm m-auto">
      <div className="py-3rem">
        <div className="bg-card text-card-foreground rounded-xl p-4 shadow-opacity-50 border border-border">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Statuses</h2>
            <Dialog
              title="Add Status"
              ref={dialogRef}
              trigger={
                <span className="flex items-center gap-2 transition rounded-lg hover:underline cursor-pointer">
                  <Icon name="Add" size={14} />
                  Add Status
                </span>
              }
            >
              <DialogDescription>
                Add a new Status to your organization.
              </DialogDescription>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <fieldset>
                  <Label name="name" label="Name Status" placeholder="Name" />
                </fieldset>

                <fieldset>
                  <Label
                    type="color"
                    name="color"
                    label="Color Status"
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

          <SortableList
            type="statuses"
            items={statusesList}
            onReorder={(newItems) => {
              handleReorder(newItems);
            }}
          />
        </div>
      </div>
    </div>
  );
}
