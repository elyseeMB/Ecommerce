import defineConfig from "@tooling/website/unocss";

export default defineConfig({
  content: {
    filesystem: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  },
});
