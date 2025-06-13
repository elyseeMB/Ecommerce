import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton.tsx";

export default {
  title: "Atoms/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>;

type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {},
};

export const Text: Story = {
  args: {
    type: "text",
    lines: 5,
  },
};

export const Card: Story = {
  args: {
    type: "card",
  },
};

export const Circle: Story = {
  args: {
    type: "circle",
  },
};

export const Render: Story = {
  render: () => (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Skeleton type="line" />
        <Skeleton type="text" lines={4} />
      </div>
    </>
  ),
};
