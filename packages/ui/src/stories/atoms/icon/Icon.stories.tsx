import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon, IconName, IconSymbols } from "./Icon.tsx";

const meta = {
  title: "Atoms/Icon",
  component: Icon,
  decorators: [
    (Story) => (
      <>
        <IconSymbols />
        <Story />
      </>
    ),
  ],
  argTypes: {
    name: { control: "select", options: IconName },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {
  args: {
    name: "ArrowRightLine",
  },
};

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        alignItems: "flex-start",
      }}
    >
      {IconName.map((name) => (
        <div key={name} style={{ textAlign: "center" }}>
          <Icon name={name} />
          <div style={{ fontSize: "12px", marginTop: "4px" }}>{name}</div>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Icon name="HomeLine" size={16} />
      <Icon name="HomeLine" size={24} />
      <Icon name="HomeLine" size={32} />
      <Icon name="HomeLine" size={48} />
    </div>
  ),
};
