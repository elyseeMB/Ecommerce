import { Dialog as DialogComponent } from "radix-ui";
import styles from "./Dialog.module.css";

import { useCallback, useState, type ComponentProps } from "react";
import { create } from "zustand";
import { combine } from "zustand/middleware";
import { Button } from "../../atoms/button/button.tsx";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./Dialog.tsx";
import { Icon } from "../../atoms/icon/Icon.tsx";

type State = {
  message: string | null;
  variant?: ComponentProps<typeof Button>["variant"];
  title?: string;
  label?: string;
  onConfirm: () => Promise<void>;
};

const useConfirmStore = create(
  combine(
    {
      message: null,
      onConfirm: () => Promise.resolve(),
    } as State,
    (set) => ({
      open: (props: State) => {
        set(props);
      },
      close: () => {
        set({ message: null });
      },
    }),
  ),
);

export function useConfirm() {
  const open = useConfirmStore((state) => state.open);

  return useCallback(
    (cb: State["onConfirm"], props: Omit<State, "onConfirm">) => {
      open({
        onConfirm: cb,
        message: props.message,
        title: props.title ?? "Etez-vous sûr ?",
        variant: props.variant ?? "primary",
        label: props.label ?? "Confirmez",
      });
    },
    [open],
  );
}

export function ConfirmDialog() {
  const { message, title, variant, label, onConfirm, close } =
    useConfirmStore();
  const isOpen = !!message;
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    onConfirm()
      .then(() => {
        close();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <DialogComponent.Root open={isOpen} onOpenChange={close}>
        <DialogComponent.Portal>
          <DialogComponent.Overlay className={styles.Overlay} />
          <DialogContent aria-describedby={undefined}>
            <header>
              <DialogTitle children={title} className={styles.Title} />
            </header>
            <DialogDescription
              className={styles.Description}
              children={message}
            />
            <footer className="flex items-center gap-2">
              <DialogClose asChild>
                <button className={styles.IconButton} aria-label="Close">
                  <Icon name="Close" />
                </button>
              </DialogClose>
              <Button
                disabled={loading}
                onClick={handleConfirm}
                variant={variant}
              >
                {label}
              </Button>
            </footer>
          </DialogContent>
        </DialogComponent.Portal>
      </DialogComponent.Root>
    </>
  );
}
