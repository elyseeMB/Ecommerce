import { UnAuthenticatedError } from "@helpers/website";
import {
  createContext,
  useContext,
  useMemo,
  type PropsWithChildren,
} from "react";
import { create, useStore as useZustandStore } from "zustand";
import { combine, persist } from "zustand/middleware";
import type { AccessLevels, Difficulties, Statuses } from "@api/website/types";
import type { Account } from "./hooks/useAuth.ts";

type ResourceMap = {
  accessLevel: AccessLevels;
  difficulties: Difficulties;
  statuses: Statuses;
};

type State = {
  account: undefined | null | Account;
  organization: Record<string, any>;
  accesslevels: AccessLevels[];
  difficulties: Difficulties[];
  statuses: Statuses[];
};

// 🔥 HELPER GÉNÉRIQUE pour mapper les types aux clés du state
function getStateKey<T extends keyof ResourceMap>(type: T): keyof State {
  switch (type) {
    case "accessLevel":
      return "accesslevels";
    case "difficulties":
      return "difficulties";
    case "statuses":
      return "statuses";
    default:
      throw new Error(`Unknown resource type: ${type}`);
  }
}

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
          // 🔥 MÉTHODES GÉNÉRIQUES UNIFIÉES
          setResources: function <T extends keyof ResourceMap>(
            type: T,
            data: ResourceMap[T][],
          ) {
            const stateKey = getStateKey(type);
            return set({ [stateKey]: data } as any);
          },

          addResource: function <T extends keyof ResourceMap>(
            type: T,
            newData: ResourceMap[T],
          ) {
            const stateKey = getStateKey(type);
            return set(
              (state) =>
                ({
                  [stateKey]: [...(state as any)[stateKey], newData],
                }) as any,
            );
          },

          updateResource: function <T extends keyof ResourceMap>(
            type: T,
            newData: ResourceMap[T],
          ) {
            const stateKey = getStateKey(type);
            return set(
              (state) =>
                ({
                  [stateKey]: (state as any)[stateKey].map((item: any) =>
                    item.id === newData.id ? { ...item, ...newData } : item,
                  ),
                }) as any,
            );
          },

          deleteResource: function <T extends keyof ResourceMap>(
            type: T,
            id: number,
          ) {
            const stateKey = getStateKey(type);
            return set(
              (state) =>
                ({
                  [stateKey]: (state as any)[stateKey].filter(
                    (item: any) => item.id !== id,
                  ),
                }) as any,
            );
          },

          // Méthodes spécifiques
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
type StoreState = Store extends { getState: () => infer T } ? T : never;

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

// 🔥 HOOK GÉNÉRIQUE MODERNE
export function useResource<T extends keyof ResourceMap>(type: T) {
  const stateKey = getStateKey(type);
  const list = useStore(
    (state) => (state as any)[stateKey] as ResourceMap[T][],
  );
  const setResources = useStore((state) => state.setResources);
  const addResource = useStore((state) => state.addResource);
  const updateResource = useStore((state) => state.updateResource);
  const deleteResource = useStore((state) => state.deleteResource);

  return {
    // Data
    list,

    // Actions
    set: (data: ResourceMap[T][]) => setResources(type, data),
    add: (data: ResourceMap[T]) => addResource(type, data),
    update: (data: ResourceMap[T]) => updateResource(type, data),
    delete: (id: number) => deleteResource(type, id),
  };
}

// 🔥 HOOKS SPÉCIFIQUES MODERNES
export function useAccessLevels() {
  return useResource("accessLevel");
}

export function useDifficulties() {
  return useResource("difficulties");
}

export function useStatuses() {
  return useResource("statuses");
}

// 🔥 HOOKS LEGACY (pour migration progressive)
export function useGetAccessLevels() {
  return useAccessLevels().set;
}

export function useListAccessLevels() {
  return useAccessLevels().list;
}

export function useUpdateAccessLevels() {
  return useAccessLevels().add;
}

export function useUpdateResources() {
  return useStore((state) => state.updateResource);
}

export function useDeleteResources() {
  return useStore((state) => state.deleteResource);
}

export function useGetDifficulties() {
  return useDifficulties().set;
}

export function useListDifficulties() {
  return useDifficulties().list;
}

export function useGetStatuses() {
  return useStatuses().set;
}

export function useListStatuses() {
  return useStatuses().list;
}

// ORGANISATION & ACCOUNT (inchangés)
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
  return { ...account };
}

export function useAccount() {
  const account = useStore((state) => state.account);
  return { ...account };
}
