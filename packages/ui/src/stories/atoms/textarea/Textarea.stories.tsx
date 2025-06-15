import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea.tsx";

export default {
  title: "Atoms/Textara",
  component: Textarea,
} satisfies Meta<typeof Textarea>;

type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {},
};

export const Autogrow: Story = {
  args: {
    autogrow: true,
  },
};
