import React, { type ReactNode } from "react";
import { NavigationMenu as Menu } from "radix-ui";
import styles from "./NavigationMenu.module.css";
import { classNames } from "@helpers/website";

export function Content({ children }: { children: ReactNode }) {
  return (
    <Menu.Content className={styles.Content}>
      <ul className={`${styles.List} one`}>{children}</ul>
    </Menu.Content>
  );
}

export function Trigger({
  title,
  icon = null,
}: {
  title: string;
  icon?: ReactNode;
}) {
  return (
    <Menu.Trigger className={styles.Trigger}>
      {title}
      {icon ?? <icon />}
    </Menu.Trigger>
  );
}

export function Item({ children }: { children: ReactNode }) {
  return (
    <>
      <Menu.Item>{children}</Menu.Item>
    </>
  );
}

export function ContainerMenu({ children }: { children: ReactNode }) {
  return <Menu.List className={styles.MenuList}>{children}</Menu.List>;
}

export function NavigationMenu({ children }: { children?: ReactNode }) {
  return (
    <Menu.Root className={styles.Root}>
      {children}
      <div className={styles.ViewportPosition}>
        <Menu.Viewport className={styles.Viewport} />
      </div>
    </Menu.Root>
  );
}

export function ListItem({
  title,
  className,
  children,
  ...props
}: React.PropsWithChildren<{ title: string; className?: string }> &
  React.JSX.IntrinsicElements["a"]) {
  return (
    <li>
      <Menu.Link asChild>
        <a className={classNames(styles.ListItemLink, className)} {...props}>
          <div className={styles.ListItemHeading}>{title}</div>
          <p className={styles.ListItemText}>{children}</p>
        </a>
      </Menu.Link>
    </li>
  );
}
