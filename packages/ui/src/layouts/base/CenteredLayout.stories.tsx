import type { Meta, StoryObj } from "@storybook/react-vite";
import { CenteredLayout } from "./CenteredLayout.tsx";

export default {
  title: "Layouts/CenteredLayout",
  component: CenteredLayout,
  parameters: {
    layout: "full",
  },
} satisfies Meta<typeof CenteredLayout>;

type Story = StoryObj<typeof CenteredLayout>;

export const Default: Story = {
  args: {
    children: "lorem ipsum",
  },
};
