import React, {
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
  type RefObject,
} from "react";
import { Dialog as DialogComponent } from "radix-ui";
import styles from "./Dialog.module.css";
import { Icon } from "../../atoms/icon/Icon.tsx";
import { Label } from "../Label/Label.tsx";
import { Button } from "../../atoms/button/button.tsx";

export type DialogRef = RefObject<{
  open: () => void;
  close: () => void;
} | null>;

type Props = {
  trigger?: ReactNode;
  title?: string;
  ref?: DialogRef;
  defaultOpen?: boolean;
} & ComponentProps<(typeof DialogComponent)["Dialog"]>;

export const useDialogRef = (): DialogRef => {
  return useRef(null);
};

export function Dialog({ trigger, title, defaultOpen, ref, children }: Props) {
  const [open, setOpen] = useState(!!defaultOpen);

  if (ref) {
    ref.current = {
      open() {
        setOpen(true);
      },
      close() {
        setOpen(false);
      },
    };
  }

  return (
    <>
      <DialogComponent.Root open={open} onOpenChange={setOpen}>
        {trigger && (
          <DialogComponent.Trigger asChild>
            <button className={`${styles.Button}`}> {trigger} </button>
          </DialogComponent.Trigger>
        )}
        <DialogComponent.Portal>
          <DialogComponent.Overlay className={styles.Overlay} />
          <DialogContent aria-describedby={undefined}>
            {title ? (
              <div>
                <DialogTitle className={styles.Title}>{title}</DialogTitle>
                <DialogClose asChild>
                  <button className={styles.IconButton} aria-label="Close">
                    <Icon name="Close" />
                  </button>
                </DialogClose>
              </div>
            ) : (
              <DialogClose asChild>
                <button className={styles.IconButton} aria-label="Close">
                  <Icon name="Close" />
                </button>
              </DialogClose>
            )}
            {children}
          </DialogContent>
        </DialogComponent.Portal>
      </DialogComponent.Root>
    </>
  );
}

export function DialogContent(
  props: ComponentProps<(typeof DialogComponent)["Content"]>,
) {
  return (
    <DialogComponent.Content className={styles.Content}>
      {props.children}
    </DialogComponent.Content>
  );
}

export function DialogTitle(
  props: ComponentProps<(typeof DialogComponent)["Title"]>,
) {
  return (
    <DialogComponent.Title {...props}>{props.children} </DialogComponent.Title>
  );
}

export function DialogFooter() {
  return (
    <>
      <DialogDescription className={styles.Description}>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>

      <fieldset className={styles.Fieldset}>
        <Label name="name" label="Name" placeholder="Pedro Duarte" />
      </fieldset>

      <fieldset>
        <Label name="username" label="Username" placeholder="@peduarte" />
      </fieldset>

      <div
        style={{
          display: "flex",
          marginTop: 25,
          justifyContent: "flex-end",
        }}
      >
        <DialogClose asChild>
          <Button> Save Change</Button>
        </DialogClose>
      </div>
      <DialogClose asChild>
        <button className={styles.IconButton} aria-label="Close">
          <Icon name="ArrowDropDownLine" />
        </button>
      </DialogClose>
    </>
  );
}

export function DialogDescription(
  props: ComponentProps<(typeof DialogComponent)["DialogDescription"]>,
) {
  return (
    <DialogComponent.Description>{props.children}</DialogComponent.Description>
  );
}

export function DialogClose(
  props: ComponentProps<(typeof DialogComponent)["DialogClose"]>,
) {
  return (
    <DialogComponent.Close {...props}>{props.children}</DialogComponent.Close>
  );
}
