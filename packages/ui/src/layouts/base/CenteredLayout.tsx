import styles from "./CenteredLayout.module.css";
import type { PropsWithChildren } from "react";
import { Outlet } from "react-router";
import { Skeleton } from "../../stories/atoms/skeleton/Skeleton.tsx";

export function CenteredLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>{children ?? <Outlet />}</div>
    </div>
  );
}

export function CenteredLayoutSkeleton() {
  return (
    <CenteredLayout>
      <Skeleton />
    </CenteredLayout>
  );
}
