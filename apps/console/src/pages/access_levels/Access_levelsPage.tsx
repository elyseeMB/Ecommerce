import { apiFetch } from "@helpers/website";
import {
  useListAccessLevels,
  useUpdateAccessLevels,
  useGetAccessLevels,
} from "../../store.tsx";
import { useCallback, useEffect, useState, type FormEventHandler } from "react";
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

export default function AccessLevelsPage() {
  const accessLevelsList = useListAccessLevels();
  const updateAccessLevels = useUpdateAccessLevels();
  const getAccessLevels = useGetAccessLevels();
  const dialogRef = useDialogRef();
  const [loading, setLoading] = useState<boolean>(false);

  const fetchAccessLevels = useCallback(() => {
    apiFetch<AccessLevels[]>("/access-levels").then(getAccessLevels);
  }, [getAccessLevels]);

  useEffect(() => {
    if (accessLevelsList.length === 0) {
      fetchAccessLevels();
    }
  }, [accessLevelsList]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    apiFetch<AccessLevels>("/access-levels", { json: data })
      .then(updateAccessLevels)
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dialogRef.current?.close();
        setLoading(false);
      });
  };

  const handleReorder = useCallback(
    (newItems: AccessLevels[]) => {
      const ids = newItems.map((item) => item.id);
      apiFetch<AccessLevels[]>("/access-levels/order", {
        json: { ids },
        method: "PUT",
      })
        .then(getAccessLevels)
        .catch((err) => console.error(err));
    },
    [getAccessLevels],
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
                  <Button disabled={loading} variant="primary" type="submit">
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Dialog>
          </div>

          <SortableList
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
