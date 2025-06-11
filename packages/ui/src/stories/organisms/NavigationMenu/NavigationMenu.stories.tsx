import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavigationMenu } from "./NavigationMenu.tsx";
import { IconSymbols } from "../../atoms/icon/Icon.tsx";

const meta = {
  title: "Organisms/MenuBar",
  component: NavigationMenu,
  decorators: [
    (Story) => (
      <>
        <IconSymbols />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
