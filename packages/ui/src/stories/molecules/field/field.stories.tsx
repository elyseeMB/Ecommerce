import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./Field.tsx";

const meta = {
  title: "Molecules/field",

  component: Field,
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Label",
    name: "id",
    help: "e.g. This is a hint",
  },
};

export const Invalid: Story = {
  args: {
    ...Default.args,
    error: "This is an error",
  },
};
