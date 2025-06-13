import React from "react";
import { Dialog as DialogComponent } from "radix-ui";
import styles from "./Dialog.module.css";
import { Icon } from "../../atoms/icon/Icon.tsx";
import { Label } from "../Label/Label.tsx";
import { Button } from "../../atoms/button/button.tsx";

export function Dialog() {
  return (
    <DialogComponent.Root>
      <DialogComponent.Trigger asChild>
        <button className={`${styles.Button} violet`}>Edit profile</button>
      </DialogComponent.Trigger>
      <DialogComponent.Portal>
        <DialogComponent.Overlay className={styles.Overlay} />
        <DialogComponent.Content className={styles.Content}>
          <DialogComponent.Title className={styles.Title}>
            Edit profile
          </DialogComponent.Title>
          <DialogComponent.Description className={styles.Description}>
            Make changes to your profile here. Click save when you're done.
          </DialogComponent.Description>
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
            <DialogComponent.Close asChild>
              <Button>Save changes</Button>
            </DialogComponent.Close>
          </div>
          <DialogComponent.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Icon name="ArrowDropDownLine" />
            </button>
          </DialogComponent.Close>
        </DialogComponent.Content>
      </DialogComponent.Portal>
    </DialogComponent.Root>
  );
}
