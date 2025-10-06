import { apiFetch } from "@helpers/website";
import { useCallback, useState } from "react";
import { type InferResourceType, type ResourceMap } from "../../store.tsx";

function keyEndpoint<T extends keyof ResourceMap>(type: T) {
  switch (type) {
    case "accessLevel":
      return "/access-levels/";
    case "difficulties":
      return "/difficulties/";
    case "statuses":
      return "/statuses/";
    case "courses":
      return "/courses/";
    default:
      throw new Error("Unknow Endpoint");
  }
}

type DELETEOptions<T> = {
  id: number;
  method: "DELETE";
  onCompleted?: (args: InferResourceType<T>["id"]) => void;
};

type PUTOptions<T> = {
  id: number;
  data: Record<string, any>;
  method: "PUT";
  onCompleted?: (args: InferResourceType<T>) => void;
};

type GETOptions<T> = {
  method: "GET";
  onCompleted?: (args: InferResourceType<T>[]) => void;
};

type POSTOptions<T> = {
  data: Record<string, any>;
  method: "POST";
  onCompleted: (args: InferResourceType<T>) => void;
};

type ORDEROptions<T> = {
  data: { ids: (number | undefined)[] };
  method: "ORDER";
  skipLoading?: boolean;
  onCompleted: (args: InferResourceType<T>[]) => void;
};

type Options<T> =
  | DELETEOptions<T>
  | PUTOptions<T>
  | GETOptions<T>
  | POSTOptions<T>
  | ORDEROptions<T>;

export function useFetchResource<T extends keyof ResourceMap>(type: T) {
  const endpoint = keyEndpoint(type);
  return Fetch(endpoint, type);
}

function Fetch<T extends keyof ResourceMap>(
  url: ReturnType<typeof keyEndpoint>,
  type: T,
) {
  const [loading, setLoading] = useState<boolean>(false);

  const handle = useCallback(
    async (options: Options<T>) => {
      if (options.method !== "ORDER") {
        setLoading(true);
      }

      switch (options.method) {
        case "DELETE":
          return apiFetch<InferResourceType<T>["id"]>(url + options.id, {
            json: { replacementId: options.id },
            method: "DELETE",
          })
            .then((id) => {
              options.onCompleted?.(id);
            })
            .catch((err) => {
              console.error("Errorr method POST:", err);
              setLoading(false);
            })
            .finally(() => setLoading(false));

        case "PUT":
          return apiFetch<InferResourceType<T>>(url + options.id, {
            json: options.data,
            method: "PUT",
          })
            .then((d) => {
              options.onCompleted?.(d);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Errorr method PUT:", err);
              setLoading(false);
            });

        case "GET":
          return apiFetch<InferResourceType<T>[]>(url)
            .then((d) => {
              options.onCompleted?.(d);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Errorr method GET:", err);
              setLoading(false);
            });

        case "POST":
          return apiFetch<InferResourceType<T>>(url, {
            json: options.data,
          })
            .then((d) => {
              options.onCompleted?.(d);
              setLoading(false);
            })
            .catch((err) => {
              console.error("Errorr method POST:", err);
              setLoading(false);
            });

        case "ORDER":
          return apiFetch<InferResourceType<T>[]>(url + "order", {
            method: "PUT",
            json: options.data,
          })
            .then((d) => {
              options.onCompleted?.(d);
            })
            .catch((err) => {
              console.error("Errorr method POST:", err);
            });
      }
    },
    [type, url],
  );

  return [handle, loading] as const;
}
