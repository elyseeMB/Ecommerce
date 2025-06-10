import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button.tsx";

const meta = {
  title: "Atoms/button",
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "button",
    children: "Button +",
  },
};

export const Submit: Story = {
  args: {
    type: "submit",
    children: "Button +",
  },
};
