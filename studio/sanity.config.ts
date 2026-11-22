import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { work } from "./schemaTypes/work";

export default defineConfig({
  name: "yiyi-portfolio",
  title: "Yiyi Portfolio｜作品管理",
  projectId: "df88b3b0",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: [work],
  },
});