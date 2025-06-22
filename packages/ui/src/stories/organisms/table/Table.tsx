import { classNames } from "@helpers/website";
import type { HTMLAttributes, PropsWithChildren } from "react";

type Props<T> = PropsWithChildren<{}> & HTMLAttributes<T>;

export function Table({ children, className }: Props<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-auto">
      <table className={classNames("w-full caption-bottom text-sm", className)}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({
  children,
  className,
}: Props<HTMLTableCellElement>) {
  return (
    <thead className={classNames("border border-border", className)}>
      {children}
    </thead>
  );
}
