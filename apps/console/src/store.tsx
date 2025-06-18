import { UnAuthenticatedError } from "@helpers/website";
import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { create, useStore as useZustandStore } from "zustand";
import { combine, persist } from "zustand/middleware";
import type { Account } from "./hooks/useAuth.ts";

type State = {
  account: undefined | null | Record<string, any>;
  organization: Record<string, any>;
};

const createStore = () =>
  create(
    persist(
      combine(
        {
          account: undefined as undefined | null | Account,
          organization: {},
        } as State,
        (set) => ({
          updateOrganization: (newDate: Record<string, any>) =>
            set({ organization: newDate }),
          updateAccount: (account: Account | null) => set({ account }),
        }),
      ),
      {
        name: "account",
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

export function StoreProvider({ children }: PropsWithChildren) {
  const store = useMemo(() => createStore(), []);

  return (
    <StoreContext.Provider value={{ store: store }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore<T>(selector: (state: StoreState) => T) {
  const store = useContext(StoreContext).store;
  if (!store) {
    throw new Error("A context need to be provider to use the store");
  }
  return useZustandStore(store, selector);
}

export function useOrganization() {
  return useStore((state) => state.organization);
}

export function useUpdateOrganization() {
  return useStore((state) => state.updateOrganization);
}

export function useUpdateAccount() {
  return useStore((state) => state.updateAccount);
}

export function useIsAuth() {
  const account = useStore((state) => state.account);

  if (!account) {
    throw new UnAuthenticatedError();
  }
  return {
    ...account,
  };
}

export function useAccount() {
  const account = useStore((state) => state.account);

  return {
    ...account,
  };
}
