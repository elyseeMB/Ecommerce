import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table } from "./Table.tsx";

export default {
  title: "Organisms/Table",
  component: Table,
} satisfies Meta<typeof Table>;

export const Default: StoryObj<typeof Table> = {
  args: {},
};
