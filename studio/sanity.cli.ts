import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "df88b3b0",
    dataset: "production",
  },
  deployment: {
    autoUpdates: true,
  },
});