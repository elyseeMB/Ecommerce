import * as React from "react";
import { Select as SelectComponent } from "radix-ui";
import { classNames } from "@helpers/website";
import { Icon } from "../icon/Icon.tsx";

type Props<T> = React.PropsWithChildren<{
  onValueChange?: (s: NonNullable<T>) => void;
  className?: string;
  placeholder?: string;
  value?: T;
}> &
  Omit<
    React.ComponentProps<(typeof SelectComponent)["Root"]>,
    "onChange" | "value"
  >;

export function Select<T>({
  className,
  placeholder,
  onValueChange,
  children,
  value,
  ...props
}: Props<T>) {
  return (
    <SelectComponent.Root onValueChange={onValueChange} value={value as string}>
      <SelectComponent.Trigger
        {...props}
        className={classNames(
          "inline-flex h-[35px] items-center justify-center gap-[5px] rounded bg-white px-[15px] text-[13px] leading-none text-violet11 shadow-[0_2px_10px] shadow-black/10 outline-none hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black data-[placeholder]:text-violet9",
          className,
        )}
        aria-label="Food"
      >
        <SelectComponent.Value placeholder={placeholder} />
        <SelectComponent.Icon className="text-violet11">
          <Icon name="ArrowDropDownLine" />
        </SelectComponent.Icon>
      </SelectComponent.Trigger>
      <SelectComponent.Portal>
        <SelectComponent.Content className="overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <SelectComponent.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <Icon name="ArrowDropUpLine" />
          </SelectComponent.ScrollUpButton>
          <SelectComponent.Viewport className="p-[5px]">
            {children}
          </SelectComponent.Viewport>
          <SelectComponent.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-violet11">
            <Icon name="ArrowDropDownLine" />
          </SelectComponent.ScrollDownButton>
        </SelectComponent.Content>
      </SelectComponent.Portal>
    </SelectComponent.Root>
  );
}

export function Option({
  className,
  children,
  ...props
}: React.ComponentProps<(typeof SelectComponent)["Item"]>) {
  return (
    <SelectComponent.Item
      className={classNames(
        "relative flex h-[25px] SelectComponent-none items-center rounded-[3px] pl-[25px] pr-[35px] text-[13px] leading-none text-violet11 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1 data-[highlighted]:outline-none",
        className,
      )}
      {...props}
    >
      <SelectComponent.ItemText asChild>{children}</SelectComponent.ItemText>
      <SelectComponent.ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
        <Icon name="Check" />
      </SelectComponent.ItemIndicator>
    </SelectComponent.Item>
  );
}
