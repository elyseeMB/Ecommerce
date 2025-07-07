import type { AccessLevels } from "@api/website/types";
import { apiFetch } from "@helpers/website";
import { useCallback, useState } from "react";
import { useDeleteResources } from "../../store.tsx";

export function useDeleteAccessLevels(id: number) {
  return Fetch(`/access-levels/${id}`, id);
}

function Fetch(url: string, id: number) {
  const deleteResources = useDeleteResources();
  const [loading, setLoading] = useState<boolean>(false);
  const callback = useCallback(
    (options: { onCompletd?: () => void }) => {
      setLoading(true);
      apiFetch<AccessLevels["id"]>(url, {
        json: { replacementId: id },
        method: "DELETE",
      })
        .then((id) => {
          console.log(id);
          deleteResources("accessLevel", id);
          options.onCompletd?.();
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    },

    [id, url, deleteResources],
  );

  return [callback, loading] as const;
}
