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
import type { AccessLevels, Difficulties, Statuses } from "@api/website/types";

type ResourceMap = {
  accessLevel: AccessLevels;
  difficulties: Difficulties;
  statuses: Statuses;
};

type State = {
  account: undefined | null | Record<string, any>;
  organization: Record<string, any>;
  accesslevels: AccessLevels[];
  difficulties: Difficulties[];
  statuses: Statuses[];
};

const createStore = () =>
  create(
    persist(
      combine(
        {
          account: undefined as undefined | null | Account,
          organization: {},
          accesslevels: [],
          difficulties: [],
          statuses: [],
        } as State,
        (set) => ({
          getAccessLevels: (accesslevels: AccessLevels[]) =>
            set({ accesslevels }),

          updateAccessLevels: (newData: AccessLevels) => {
            return set((state) => ({
              accesslevels: [...state.accesslevels, newData],
            }));
          },

          udpateResources: function <T extends keyof ResourceMap>(
            type: T,
            newData: ResourceMap[T],
          ) {
            switch (type) {
              case "accessLevel":
                return set((state) => ({
                  accesslevels: state.accesslevels.map((item) =>
                    item.id === newData.id ? { ...item, ...newData } : item,
                  ),
                }));
              case "difficulties":
                return set((state) => ({
                  difficulties: state.difficulties.map((item) =>
                    item.id === newData.id ? { ...item, ...newData } : item,
                  ),
                }));
              case "statuses":
                return set((state) => ({
                  statuses: state.statuses.map((item) =>
                    item.id === newData.id ? { ...item, ...newData } : item,
                  ),
                }));
            }
          },

          deleteResources: function <T extends keyof ResourceMap>(
            type: T,
            id: number,
          ) {
            switch (type) {
              case "accessLevel":
                return set((state) => ({
                  accesslevels: state.accesslevels.filter(
                    (item) => item.id !== id,
                  ),
                }));
              case "difficulties":
                return set((state) => ({
                  difficulties: state.difficulties.filter(
                    (item) => item.id !== id,
                  ),
                }));
              case "statuses":
                return set((state) => ({
                  statuses: state.statuses.filter((item) => item.id !== id),
                }));
            }
          },

          getDifficulties: (difficulties: Difficulties[]) =>
            set({ difficulties }),

          getStatuses: (statuses: Statuses[]) => set({ statuses }),

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

// ACCESS_LEVELS
export function useGetAccessLevels() {
  return useStore((state) => state.getAccessLevels);
}

export function useListAccessLevels() {
  return useStore((state) => state.accesslevels);
}

export function useUpdateAccessLevels() {
  return useStore((state) => state.updateAccessLevels);
}

export function useUpdateResources() {
  return useStore((state) => state.udpateResources);
}

export function useDeleteResources() {
  return useStore((state) => state.deleteResources);
}

// DIFFICULTIES
export function useGetDifficulties() {
  return useStore((state) => state.getDifficulties);
}

export function useListDifficulties() {
  return useStore((state) => state.difficulties);
}

// STATUSES
export function useGetStatuses() {
  return useStore((state) => state.getStatuses);
}

export function useListStatuses() {
  return useStore((state) => state.statuses);
}

// ORGANISATION
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
