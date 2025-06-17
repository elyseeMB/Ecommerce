import { classNames } from "@helpers/website";
import {
  Children,
  cloneElement,
  isValidElement,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactElement,
  type ReactNode,
} from "react";

export type AsChildProps<BaseProps, SecondaryProps> =
  | ({ asChild: true; children: ReactNode } & BaseProps & {
        [k in keyof SecondaryProps]: never;
      })
  | ({ asChild?: false } & BaseProps & SecondaryProps);

export function Slot(props: PropsWithChildren<HTMLAttributes<HTMLElement>>) {
  const children = Children.toArray(props.children).filter((c) =>
    isValidElement(c),
  );

  if (children.length !== 1) {
    throw new Error("Slot must have exactly one child element");
  }

  const child = children[0] as ReactElement<HTMLAttributes<HTMLElement>>;

  return cloneElement(child, {
    ...props,
    ...child.props,
    style:
      props.style || child.props.style
        ? {
            ...props.style,
            ...child.props.style,
          }
        : undefined,
    className:
      props.className || child.props.className
        ? classNames(props.className, child.props.className)
        : undefined,
  });
}
