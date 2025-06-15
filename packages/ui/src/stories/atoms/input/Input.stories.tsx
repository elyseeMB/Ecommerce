import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input.tsx";
import { Icon } from "../icon/Icon.tsx";

export default {
  title: "Atoms/Input",
  component: Input,
} satisfies Meta<typeof Input>;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};

export const WithIcon: Story = {
  args: {
    icon: () => <Icon name="HomeLine" size={24} />,
  },
};
