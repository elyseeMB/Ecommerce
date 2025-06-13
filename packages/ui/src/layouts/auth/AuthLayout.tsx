import type { PropsWithChildren } from "react";
import styles from "./AuthLayout.module.css";
import { Outlet } from "react-router";

export function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className={styles.Layout}>
      <div className={styles.Left}>{children ?? <Outlet />}</div>
      <div className={styles.Right}>
        <h2>Welcome</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus modi
          quaerat exercitationem! Quae officia error id dolore cumque qui
          placeat temporibus aperiam! Dolor excepturi labore sed fuga obcaecati
          dolorem reiciendis!
        </p>
      </div>
    </div>
  );
}
