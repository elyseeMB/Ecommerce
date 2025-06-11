import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./button.tsx";

const meta = {
  title: "Atoms/button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    type: "button",
    children: "Button +",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Button +",
  },
};

export const Small: Story = {
  args: {
    size: "small",
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
