// SidebarContext.js
import React from 'react';

export const SidebarContext = React.createContext({
  isNavExpanded: false,
  toggleNav: () => {}
});
