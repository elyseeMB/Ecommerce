import type { Meta, StoryObj } from "@storybook/react-vite";
import { Option, Select } from "./Select.tsx";

export default {
  title: "Atoms/Select",
  component: Select,
} satisfies Meta<typeof Select>;

export const Default: StoryObj<typeof Select> = {
  args: {
    placeholder: "Enter value",
    children: (
      <>
        <Option value="option 1">Option 1</Option>
        <Option value="option 2">Option 2</Option>
        <Option value="option 3">Option 3</Option>
      </>
    ),
  },
};
