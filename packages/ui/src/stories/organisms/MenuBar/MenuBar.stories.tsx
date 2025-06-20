import type { Meta, StoryObj } from "@storybook/react-vite";
import MenubarComponent from "./MenuBar.tsx";

export default {
  title: "Organisms/MenuBar",
  component: MenubarComponent,
} satisfies Meta<typeof MenubarComponent>;

type Story = StoryObj<typeof MenubarComponent>;

export const Default: Story = {
  args: {},
};
