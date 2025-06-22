import react from "react";

import type { Preview } from "@storybook/react-vite";
import { IconSymbols } from "../src/stories/atoms/icon/Icon.tsx";
import "virtual:uno.css";

import "../src/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story, { parameters }) => {
      return (
        <>
          <IconSymbols />
          <Story />
        </>
      );
    },
  ],
};

export default preview;
