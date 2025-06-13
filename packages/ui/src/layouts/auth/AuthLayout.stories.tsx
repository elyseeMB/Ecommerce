import type { Meta, StoryObj } from "@storybook/react-vite";
import { AuthLayout } from "./AuthLayout.tsx";

export default {
  title: "Layouts/AuthLayout",
  component: AuthLayout,
  parameters: {
    layout: "full",
  },
} satisfies Meta<typeof AuthLayout>;

type Story = StoryObj<typeof AuthLayout>;

export const Default: Story = {
  args: {
    children: "Text goes here",
  },
};
