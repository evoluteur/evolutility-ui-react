import { modelsArray } from "utils/moMa";

export interface DocMenuItem {
  id: string;
  text: string;
  icon: string;
}

export const docMenus: DocMenuItem[] = [
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

export interface DemoMenuItem {
  id: string;
  text: string | undefined;
  icon: string | undefined;
  defaultViewMany: string;
}

export const demosMenu: DemoMenuItem[] = modelsArray.map(
  ({ id, title: text, icon, defaultViewMany = "list" }) => ({
    id,
    text,
    icon,
    defaultViewMany,
  }),
);
