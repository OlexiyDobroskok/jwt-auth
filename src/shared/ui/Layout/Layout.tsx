import { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  headerSlot?: ReactNode;
  footerSlot?: ReactNode;
}

export const Layout = ({ headerSlot, footerSlot }: LayoutProps) => {
  return (
    <div>
      {headerSlot}
      <main>
        <Outlet />
      </main>
      {footerSlot}
    </div>
  );
};
