import styles from "./CenteredLayout.module.css";
import type { PropsWithChildren } from "react";
import { Outlet } from "react-router";
import { Skeleton } from "../../stories/atoms/skeleton/Skeleton.tsx";
import { ConfirmDialog } from "../../stories/molecules/dialog/ConfirmDialog.tsx";
import { IconSymbols } from "../../stories/atoms/icon/Icon.tsx";

export function CenteredLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Container}>
        {children ?? (
          <>
            <Outlet />
            <ConfirmDialog />
            <IconSymbols />
          </>
        )}
      </div>
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
