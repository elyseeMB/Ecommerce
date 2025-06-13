import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./Label.tsx";
import { FormComponent } from "../form/form.tsx";

export default {
  title: "Molecules/Label",
  component: Label,
  decorators: [
    (Story) => (
      <>
        <FormComponent>
          <Story />
        </FormComponent>
      </>
    ),
  ],
} satisfies Meta<typeof Label>;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    label: "First Name",
    name: "firstname",
    placeholder: "Pedro Duarte",
  },
};
