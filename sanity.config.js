// Single workspace configuration

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  basePath: "/studio",
  projectId: "uvoyl5qm",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
  // studio: {
  //   components: {
  //     layout: Studio,
  //   },
  // },
});
