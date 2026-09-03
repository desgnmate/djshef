import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { sanityDataset, sanityProjectId } from "./lib/sanity/env";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "SHEF CMS",
  projectId: sanityProjectId || "missing-project-id",
  dataset: sanityDataset,
  basePath: "/studio",
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
