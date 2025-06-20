import * as React from "react";
import { Menubar } from "radix-ui";

import styles from "./MenuBar.module.css";
import { Icon } from "../../atoms/icon/Icon.tsx";

const RADIO_ITEMS = ["Andy", "Benoît", "Luis"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];

const MenubarComponent = () => {
  return (
    <Menubar.Root className={styles.Root}>
      <Menubar.Menu>
        <Menubar.Trigger className={styles.Trigger}>Course</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className={styles.Content}
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className={styles.Item}>Cut</Menubar.Item>
            <Menubar.Item className={styles.Item}>Copy</Menubar.Item>
            <Menubar.Item className={styles.Item}>Cut</Menubar.Item>
            <Menubar.Item className={styles.Item}>Copy</Menubar.Item>
            <Menubar.Separator className={styles.Separator} />
            <Menubar.Item className={styles.Item}>Paste</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className={styles.Trigger}>
          Difficulties
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className={styles.Content}
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className={styles.Item}>Cut</Menubar.Item>
            <Menubar.Item className={styles.Item}>Copy</Menubar.Item>
            <Menubar.Item className={styles.Item}>Cut</Menubar.Item>
            <Menubar.Item className={styles.Item}>Copy</Menubar.Item>
            <Menubar.Separator className={styles.Separator} />
            <Menubar.Item className={styles.Item}>Paste</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className={styles.Trigger}>Statuses</Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className={styles.Content}
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className={styles.Item}>Cut</Menubar.Item>
            <Menubar.Item className={styles.Item}>Copy</Menubar.Item>
            <Menubar.Item className={styles.Item}>Cut</Menubar.Item>
            <Menubar.Item className={styles.Item}>Copy</Menubar.Item>
            <Menubar.Separator className={styles.Separator} />
            <Menubar.Item className={styles.Item}>Paste</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className={styles.Trigger}>
          Access Levels
        </Menubar.Trigger>
        <Menubar.Portal>
          <Menubar.Content
            className={styles.Content}
            align="start"
            sideOffset={5}
            alignOffset={-3}
          >
            <Menubar.Item className={styles.Item}>Cut</Menubar.Item>
            <Menubar.Item className={styles.Item}>Copy</Menubar.Item>
            <Menubar.Item className={styles.Item}>Cut</Menubar.Item>
            <Menubar.Item className={styles.Item}>Copy</Menubar.Item>
            <Menubar.Separator className={styles.Separator} />
            <Menubar.Item className={styles.Item}>Paste</Menubar.Item>
          </Menubar.Content>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default MenubarComponent;
