import { modelsArray } from "../../../utils/moMa";

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

export const demosMenu = modelsArray.map(
  ({ id, label: text, icon, defaultViewMany = "list" }) => ({
    id,
    text,
    icon,
    defaultViewMany,
  })
);
