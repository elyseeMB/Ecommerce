import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, TableHeader } from "./Table.tsx";

export default {
  title: "Organisms/Table",
  component: Table,
  args: {},
} satisfies Meta<typeof Table>;

type Story = StoryObj<typeof Table>;

export const Default: Story = {
  render: () => (
    <>
      <Table>
        <TableHeader>Bonjour les gens</TableHeader>
      </Table>
    </>
  ),
};
