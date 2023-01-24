import { modelsArray } from "./utils/moMa";

export const docMenus = [
  { id: "install", text: "Installation", icon: "designer/cog.png" },
  { id: "config", text: "Configuration", icon: "designer/wrench.png" },
  {
    id: "metamodel",
    text: "Metamodel",
    icon: "designer/metadata.png",
  },
  {
    id: "models",
    text: "Sample Models",
    icon: "designer/metadata.png",
  },
  { id: "views", text: "Views", icon: "designer/object.png" },
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
