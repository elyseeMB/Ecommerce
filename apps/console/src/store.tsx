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
import type {
  AccessLevels,
  Courses,
  Difficulties,
  Statuses,
} from "@api/website/types";

export type ResourceMap = {
  accessLevel: AccessLevels;
  difficulties: Difficulties;
  statuses: Statuses;
  courses: Courses;
};

type State = {
  account: undefined | null | Record<string, any>;
  organization: Record<string, any>;
  accesslevels: AccessLevels[];
  difficulties: Difficulties[];
  statuses: Statuses[];
  courses: Courses[];
};

function getStateKey<T extends keyof ResourceMap>(
  type: T,
): keyof Omit<State, "account" | "organization"> {
  switch (type) {
    case "accessLevel":
      return "accesslevels";
    case "difficulties":
      return "difficulties";
    case "statuses":
      return "statuses";
    case "courses":
      return "courses";

    default:
      throw new Error("Courses resource type " + type);
  }
}

const createStore = () =>
  create(
    persist(
      combine(
        {
          account: undefined as undefined | null | Account,
          organization: {},
          courses: [],
          accesslevels: [],
          difficulties: [],
          statuses: [],
        } as State,
        (set) => ({
          setResources: function <T extends keyof ResourceMap>(
            type: T,
            data: ResourceMap[T][],
          ) {
            const key = getStateKey(type);
            return set({ [key]: data });
          },

          addResource: function <T extends keyof ResourceMap>(
            type: T,
            newData: ResourceMap[T],
          ) {
            const key = getStateKey(type);
            return set((state) => ({
              [key]: [...state[key], newData],
            }));
          },

          updateResource: function <T extends keyof ResourceMap>(
            type: T,
            newData: ResourceMap[T],
          ) {
            const key = getStateKey(type);
            return set((state) => ({
              [key]: state[key].map((item) =>
                item.id === newData.id ? { ...item, ...newData } : item,
              ),
            }));
          },

          deleteResource: function <T extends keyof ResourceMap>(
            type: T,
            id: number,
          ) {
            const key = getStateKey(type);
            return set((state) => ({
              [key]: state[key].filter((item) => item.id !== id),
            }));
          },

          setCourses: (courses: Courses[]) => {
            set({ courses });
          },

          addCourse: (course: Courses) => {
            set((state) => ({
              courses: [...state.courses, course],
            }));
          },

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

export type InferResourceType<T> = T extends keyof ResourceMap
  ? ResourceMap[T]
  : never;

export function useResource<T extends keyof ResourceMap>(type: T) {
  const key = getStateKey(type);
  const list = useStore((state) => state[key]) as InferResourceType<T>[];

  const setResources = useStore((state) => state.setResources);
  const addResource = useStore((state) => state.addResource);
  const updateResource = useStore((state) => state.updateResource);
  const deleteResource = useStore((state) => state.deleteResource);

  return {
    list,
    set: (data: InferResourceType<T>[]) => setResources(type, data),
    add: (data: InferResourceType<T>) => addResource(type, data),
    update: (data: InferResourceType<T>) => updateResource(type, data),
    delete: (id: number) => deleteResource(type, id),
  };
}

// ACCESS_LEVELS
export function useAccessLevels() {
  return useResource("accessLevel");
}

// DIFFICULTIES
export function useDifficulties() {
  return useResource("difficulties");
}

// STATUSES
export function useStatuses() {
  return useResource("statuses");
}

// COURSES
export function useCourses() {
  const list = useStore((state) => state.courses);
  const setCourses = useStore((state) => state.setCourses);
  const addCourses = useStore((state) => state.addCourse);

  return {
    list,
    set: (data: Courses[]) => setCourses(data),
    add: (data: Courses) => addCourses(data),
  };
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
