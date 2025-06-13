import { UnAuthenticatedError } from "@helpers/website";
import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { create, useStore as useZustandStore } from "zustand";
import { persist, combine } from "zustand/middleware";
import type { Account } from "./hooks/useAuth.ts";

type State = {
  data: Params;
  account: undefined | null | Account;
};
type Params = {
  name: string;
};

const createStore = (data: Params) =>
  create(
    persist(
      combine(
        {
          account: undefined as undefined | null | Account,
          data,
        } as State,
        (set) => ({
          updateData: (newData: Params) => set({ data: newData }),
          updateAccount: (account: Account | null) => set({ account }),
        }),
      ),
      {
        name: "data",
      },
    ),
  );

type Store = ReturnType<typeof createStore>;

type StoreState = Store extends {
  getState: () => infer T;
}
  ? T
  : never;

const StoreContext = createContext<{ store?: Store }>({});

export function StoreProvider({
  children,
  data,
}: PropsWithChildren<{ data: Params }>) {
  const store = useMemo(() => createStore(data), []);

  return (
    <StoreContext.Provider value={{ store: store }}>
      {children}
    </StoreContext.Provider>
  );
}

function useStore<T>(selector: (state: StoreState) => T) {
  const store = useContext(StoreContext).store;
  if (!store) {
    throw new Error("A context need to be provider to use the store");
  }
  return useZustandStore(store, selector);
}

export function useData() {
  return useStore((state) => state.data);
}

export function useUpdateData() {
  return useStore((state) => state.updateData);
}

export function useUpdateAccount() {
  return useStore((state) => state.updateAccount);
}

export function useAccount() {
  return useStore((state) => state.account);
}
