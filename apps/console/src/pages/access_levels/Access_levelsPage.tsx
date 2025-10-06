import { useResource } from "../../store.tsx";
import { useCallback, useEffect, type FormEventHandler } from "react";
import type { AccessLevels } from "@api/website/types";
import {
  Button,
  Dialog,
  DialogDescription,
  Icon,
  Label,
  useDialogRef,
} from "@ui/website";
import { SortableList } from "../../components/SortalbeResources.tsx";
import { useFetchResource } from "../../hooks/resource/useFetchResource.ts";

export default function AccessLevelsPage() {
  const {
    list: accessLevelsList,
    set: setAccessLevels,
    add: addAccessLevels,
  } = useResource("accessLevel");
  const [handle, isLoading] = useFetchResource("accessLevel");
  const dialogRef = useDialogRef();

  const fetchDifficulties = useCallback(() => {
    handle({
      method: "GET",
      onCompleted: setAccessLevels,
    });
  }, [setAccessLevels]);

  useEffect(() => {
    if (accessLevelsList.length === 0) {
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
      onCompleted: addAccessLevels,
    })
      .catch((err) => console.error(err))
      .finally(() => {
        dialogRef.current?.close();
      });
  };

  const handleReorder = useCallback(
    (newItems: AccessLevels[]) => {
      const ids = newItems.map((item) => item.id);
      handle({
        method: "ORDER",
        data: { ids },
        onCompleted: setAccessLevels,
      }).catch((err) => console.error(err));
    },
    [setAccessLevels],
  );

  return (
    <div className="max-w-screen-sm m-auto">
      <div className="py-3rem">
        <div className="bg-card text-card-foreground rounded-xl p-4 shadow-opacity-50 border border-border">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold text-primary">Access Levels</h2>
            <Dialog
              title="Add Access Level"
              ref={dialogRef}
              trigger={
                <span className="flex items-center gap-2 transition rounded-lg hover:underline cursor-pointer">
                  <Icon name="Add" size={14} />
                  Add Access Level
                </span>
              }
            >
              <DialogDescription>
                Add a new access level to your organization.
              </DialogDescription>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <fieldset>
                  <Label
                    name="name"
                    label="Name Access Level"
                    placeholder="Name"
                  />
                </fieldset>

                <fieldset>
                  <Label
                    type="color"
                    name="color"
                    label="Color Access Levels"
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
            type="accessLevel"
            items={accessLevelsList}
            onReorder={(newItems) => {
              handleReorder(newItems);
            }}
          />
        </div>
      </div>
    </div>
  );
}
