import React, {
  Suspense,
  type PropsWithChildren,
  type ReactElement,
} from "react";
import { Outlet, createBrowserRouter, type RouteObject } from "react-router";

import { lazy, type FC, type LazyExoticComponent } from "react";

type AppRoutes = {
  path: string;
  component: FC<any> | LazyExoticComponent<FC<any>> | ReactElement;
  children?: AppRoutes[];
};

export default function Text() {
  return (
    <div>
      jee auth
      <Outlet />
    </div>
  );
}

const routes = [
  {
    path: "/auth",
    component: Text,
    children: [
      {
        path: "login",
        component: lazy(() => import("./pages/auth/LoginPage.tsx")),
      },
    ],
  },
] satisfies AppRoutes[];

function routerTransformer(route: AppRoutes): RouteObject {
  const { component, children, ...rest } = route;

  const element = React.isValidElement(component) ? (
    component
  ) : (
    <Suspense fallback={<div>Chargement...</div>}>
      {React.createElement(component as FC<any>)}
    </Suspense>
  );

  return {
    ...rest,
    element,
    children: children?.map(routerTransformer),
  };
}

export const router = createBrowserRouter(routes.map(routerTransformer));
