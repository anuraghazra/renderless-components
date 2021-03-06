import { createHook, createComponent } from "reakit-system";
import { useDialog, DialogOptions, DialogHTMLProps } from "reakit";

import { DRAWER_KEYS } from "./__keys";

const PLACEMENTS = {
  left: {
    left: 0,
    top: 0,
    bottom: 0,
    height: "100vh",
  },
  right: {
    right: 0,
    top: 0,
    bottom: 0,
    height: "100vh",
  },
  top: {
    right: 0,
    left: 0,
    top: 0,
    width: "100vw",
  },
  bottom: {
    right: 0,
    left: 0,
    bottom: 0,
    width: "100vw",
  },
};

export type TPlacement = keyof typeof PLACEMENTS;

export type DrawerOptions = DialogOptions & { placement?: TPlacement };

export type DrawerHTMLProps = DialogHTMLProps;

export type DrawerProps = DrawerOptions & DrawerHTMLProps;

const useDrawer = createHook<DrawerOptions, DrawerHTMLProps>({
  name: "Drawer",
  compose: useDialog,
  keys: DRAWER_KEYS,

  useProps({ placement = "left" }, { style: htmlStyles, ...htmlProps }) {
    return {
      style: {
        ...PLACEMENTS[placement],
        position: "fixed",
        ...htmlStyles,
      },
      ...htmlProps,
    };
  },
});

export const Drawer = createComponent({
  as: "div",
  useHook: useDrawer,
});
