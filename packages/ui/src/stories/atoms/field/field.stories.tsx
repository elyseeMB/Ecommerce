import type { Meta, StoryObj } from "@storybook/react-vite";
import { FieldForm } from "./field.tsx";
import { Form } from "radix-ui";

const meta = {
  title: "Atoms/field",
  decorators: [
    (Story) => (
      <>
        <Form.Root>
          <Story />
        </Form.Root>
      </>
    ),
  ],
  component: FieldForm,
} satisfies Meta<typeof FieldForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "email",
    label: "Email",
    type: "email",
  },
};
