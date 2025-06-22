import { UserConfig, mergeConfigs, presetWind4 } from "unocss";

export default (config: UserConfig = {}) =>
  mergeConfigs([
    config,
    {
      presets: [
        presetWind4({
          preflights: {
            reset: true,
          },
        }),
      ],
      theme: {
        colors: {
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",

          muted: "hsl(var(--muted))",
          "muted-foreground": "hsl(var(--muted-foreground))",

          popover: "hsl(var(--popover))",
          "popover-foreground": "hsl(var(--popover-foreground))",

          card: "hsl(var(--card))",
          "card-foreground": "hsl(var(--card-foreground))",

          border: "hsl(var(--border))",
          input: "hsl(var(--input))",

          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },

          secondary: {
            DEFAULT: "hsl(var(--secondary))",
            foreground: "hsl(var(--secondary-foreground))",
          },

          accent: {
            DEFAULT: "hsl(var(--accent))",
            foreground: "hsl(var(--accent-foreground))",
          },

          destructive: {
            DEFAULT: "hsl(var(--destructive))",
            foreground: "hsl(var(--destructive-foreground))",
          },

          ring: "hsl(var(--ring))",
        },

        radius: {
          sm: "calc(var(--radius) - 4px)",
          md: "calc(var(--radius) - 2px)",
          lg: "var(--radius)",
          xl: "calc(var(--radius) + 4px)",
        },
      },
    },
  ]);
