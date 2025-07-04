import React, {
  Suspense,
  type PropsWithChildren,
  type ReactElement,
} from "react";
import {
  Navigate,
  Outlet,
  createBrowserRouter,
  useRouteError,
  type RouteObject,
} from "react-router";

import { lazy, type FC, type LazyExoticComponent } from "react";
import { UnAuthenticatedError } from "@helpers/website";
import {
  AuthLayout,
  CenteredLayout,
  CenteredLayoutSkeleton,
} from "@ui/website";
import { Room } from "./pages/Room.tsx";
import { MainLayout } from "./layouts/MainLayout.tsx";

function ErrorBoundary() {
  const error = useRouteError();
  if (error instanceof UnAuthenticatedError) {
    return <Navigate to="auth/login" />;
  }
  return <div>error</div>;
}

export default function Text() {
  return (
    <div>
      jee auth
      <Outlet />
    </div>
  );
}

type AppRoutes = {
  Component: FC<any> | LazyExoticComponent<FC<any>> | ReactElement;
  children?: AppRoutes[];
  fallback?: FC;
} & Omit<RouteObject, "Component" | "children">;

const routes = [
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: lazy(() => import("./pages/auth/RegisterPage.tsx")),
      },
      {
        path: "login",
        Component: lazy(() => import("./pages/auth/LoginPage.tsx")),
      },
    ],
  },
  {
    path: "/organizations",
    Component: CenteredLayout,
    fallback: CenteredLayoutSkeleton,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: "create",
        Component: lazy(() => import("./pages/organizations/Create.tsx")),
      },
    ],
  },
  {
    path: "/",
    Component: MainLayout,
    fallback: CenteredLayoutSkeleton,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: "courses",
        Component: lazy(() => import("./pages/courses/CoursesPage.tsx")),
      },
      {
        path: "access-levels",
        Component: lazy(
          () => import("./pages/access_levels/Access_levelsPage.tsx"),
        ),
      },
      {
        path: "difficulties",
        Component: lazy(
          () => import("./pages/difficulties/DifficultiesPage.tsx"),
        ),
      },
      {
        path: "statuses",
        Component: lazy(() => import("./pages/statuses/StatusPage.tsx")),
      },
    ],
  },
] satisfies AppRoutes[];

function routerTransformer({
  fallback: FallbackComponent,
  ...route
}: AppRoutes): RouteObject {
  let result = { ...route };

  if (FallbackComponent) {
    result = {
      ...result,
      Component: (props) => (
        <Suspense fallback={<FallbackComponent />}>
          <route.Component {...props} />
        </Suspense>
      ),
    };
  }

  return {
    ...result,
    children: route.children?.map(routerTransformer) as RouteObject,
  };
}

export const router = createBrowserRouter(routes.map(routerTransformer));
