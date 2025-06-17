import { useEffect } from "react";

export function useAsyncEffect(cb: Function, deps: []) {
  useEffect(() => {
    cb();
  }, deps);
}
