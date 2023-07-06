import { NavLink } from "react-router-dom";
import { appRoutes } from "shared/lib";
import clsx from "clsx";
import classes from "./HeaderLayout.module.scss";
import { useAppSelector } from "shared/model";
import { selectIsAuthorized } from "entities/session";

export const HeaderLayout = () => {
  const isAuthorize = useAppSelector(selectIsAuthorized);
  const navLinkClassName = (isActive: boolean): string =>
    isActive ? clsx(classes.link, classes.selected) : classes.link;
  return (
    <header>
      <nav className={classes.navMenu}>
        <NavLink
          className={({ isActive }) => navLinkClassName(isActive)}
          to={appRoutes.ROOT}
        >
          Home
        </NavLink>
        {isAuthorize ? (
          <NavLink
            className={({ isActive }) => navLinkClassName(isActive)}
            to={appRoutes.PROFILE}
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) => navLinkClassName(isActive)}
            to={appRoutes.ACCOUNT}
          >
            Account
          </NavLink>
        )}
      </nav>
    </header>
  );
};
