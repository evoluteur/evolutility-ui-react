import { modelsArray } from "./utils/moMa";

export const docMenus = [
  { id: "docs/install", text: "Installation", icon: "designer/cog.png" },
  { id: "docs/config", text: "Configuration", icon: "designer/cog.png" },
  {
    id: "docs/metamodel",
    text: "Metamodel",
    icon: "designer/metadata.png",
  },
  {
    id: "docs/models",
    text: "Sample Models",
    icon: "designer/metadata.png",
  },
  { id: "docs/views", text: "Views", icon: "designer/object.png" },
];

const appMenus = [
  {
    id: "demos",
    title: "Demos",
    icon: "eye",
    world: "demos",
    menus: modelsArray.map((m) => ({
      id: m.id,
      text: m.label,
      icon: m.icon,
    })),
  },
  {
    id: "docs",
    title: "Documentation",
    icon: "book",
    world: "docs",
    menus: docMenus,
  },
];

export default appMenus;
