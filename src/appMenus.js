import { modelsArray } from "./utils/moMa";

export const docMenus = [
  { id: "install", text: "Installation", icon: "doc/cog.png" },
  { id: "config", text: "Configuration", icon: "doc/wrench.png" },
  {
    id: "metamodel",
    text: "Metamodel",
    icon: "doc/metadata.png",
  },
  {
    id: "models",
    text: "Sample Models",
    icon: "doc/metadata.png",
  },
  { id: "views", text: "Views", icon: "doc/object.png" },
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
