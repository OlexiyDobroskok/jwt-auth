import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

import classes from "./Layout.module.scss";

interface LayoutProps {
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
}

export const Layout = ({ headerSlot, footerSlot }: LayoutProps) => {
  return (
    <div className={classes.appContainer}>
      {headerSlot}
      <main>
        <Outlet />
      </main>
      {footerSlot}
    </div>
  );
};
