import { modelsArray } from "utils/moMa";

export const docMenus = [
  { id: "install", text: "Installation", icon: "doc/cog.png" },
  { id: "config", text: "Configuration", icon: "doc/wrench.png" },
  { id: "views", text: "Views", icon: "doc/object.png" },
  {
    id: "metamodel",
    text: "Metamodel",
    icon: "doc/tag_pink.png",
  },
  {
    id: "models",
    text: "Sample Models",
    icon: "doc/model.png",
  },
];

export const demosMenu = modelsArray.map(
  ({ id, title: text, icon, defaultViewMany = "list" }) => ({
    id,
    text,
    icon,
    defaultViewMany,
  })
);
