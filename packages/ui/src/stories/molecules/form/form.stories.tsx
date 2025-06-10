import type { Meta, StoryObj } from "@storybook/react-vite";
import { FormDemo } from "./form.tsx";

const meta = {
  title: "Molecules/form",
  component: FormDemo,
} satisfies Meta<typeof FormDemo>;
export default meta;

export type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
