import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { matchPath, useLocation } from "react-router";
import { ZudokuContext } from "../../core/ZudokuContext.js";
import { joinPath } from "../../util/joinPath.js";
import { CACHE_KEYS } from "../cache.js";
import { traverseSidebar } from "../navigation/utils.js";

export const ZudokuReactContext = createContext<ZudokuContext | undefined>(
  undefined,
);

export const useZudoku = () => {
  const context = useContext(ZudokuReactContext);

  if (!context) {
    throw new Error("useZudoku must be used within a ZudokuProvider.");
  }

  return context;
};

export const useApiIdentities = () => {
  const { getApiIdentities } = useZudoku();

  return useQuery({
    queryFn: getApiIdentities,
    queryKey: [CACHE_KEYS.API_IDENTITIES],
  });
};

export const useCurrentNavigation = () => {
  const { getPluginSidebar, sidebars, topNavigation } = useZudoku();
  const location = useLocation();

  const currentSidebarItem = Object.entries(sidebars).find(([, sidebar]) => {
    return traverseSidebar(sidebar, (item) => {
      const itemId =
        item.type === "doc"
          ? joinPath(item.id)
          : item.type === "category" && item.link
            ? joinPath(item.link.id)
            : undefined;

      if (itemId === location.pathname) {
        return item;
      }
    });
  });
  const currentTopNavItem =
    topNavigation.find((t) => t.id === currentSidebarItem?.[0]) ??
    topNavigation.find((item) => matchPath(item.id, location.pathname));

  const { data } = useSuspenseQuery({
    queryFn: () => getPluginSidebar(location.pathname),
    queryKey: ["plugin-sidebar", location.pathname],
  });

  return {
    sidebar: [...(currentSidebarItem ? currentSidebarItem[1] : []), ...data],
    topNavItem: currentTopNavItem,
  };
};
