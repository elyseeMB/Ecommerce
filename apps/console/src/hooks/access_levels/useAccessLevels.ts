import { apiFetch } from "@helpers/website";
import { useCallback, useState } from "react";
import {
  useResource,
  type InferResourceType,
  type ResourceMap,
} from "../../store.tsx";

function keyEndpoint<T extends keyof ResourceMap>(type: T) {
  switch (type) {
    case "accessLevel":
      return "/access-levels/";
    case "difficulties":
      return "/difficulties/";
    case "statuses":
      return "/statuses/";
    default:
      throw new Error("Unknow Endpoint");
  }
}

export function useFetchDeleteResource<T extends keyof ResourceMap>(
  type: T,
  id: number,
) {
  const endpoint = (keyEndpoint(type) + id) as ReturnType<typeof keyEndpoint>;
  return Fetch(endpoint, type, id);
}

function Fetch<T extends keyof ResourceMap>(
  url: ReturnType<typeof keyEndpoint>,
  type: T,
  id: number,
) {
  const { delete: deleteResource } = useResource(type);
  const [loading, setLoading] = useState<boolean>(false);
  const callback = useCallback(
    (options: { onCompletd?: () => void }) => {
      setLoading(true);
      apiFetch<InferResourceType<T>["id"]>(url, {
        json: { replacementId: id },
        method: "DELETE",
      })
        .then((id) => {
          console.log(id);
          deleteResource(id!);
          options.onCompletd?.();
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    },

    [id, url, deleteResource],
  );

  return [callback, loading] as const;
}
