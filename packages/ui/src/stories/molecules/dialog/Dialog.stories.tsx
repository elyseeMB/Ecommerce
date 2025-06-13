import type { Meta, StoryObj } from "@storybook/react-vite";
import { Dialog } from "./Dialog.tsx";
import { FormComponent } from "../form/form.tsx";

const meta = {
  title: "Molecules/Dialog",
  component: Dialog,
  decorators: [
    (Story) => (
      <>
        <FormComponent>
          <Story />
        </FormComponent>
      </>
    ),
  ],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
