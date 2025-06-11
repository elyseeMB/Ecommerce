import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchBar } from "./SearchBar.tsx";
import { IconSymbols } from "../../atoms/icon/Icon.tsx";

const meta = {
  title: "Organisms/SearchBar",
  component: SearchBar,
  decorators: [
    (Story) => (
      <>
        <IconSymbols />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
