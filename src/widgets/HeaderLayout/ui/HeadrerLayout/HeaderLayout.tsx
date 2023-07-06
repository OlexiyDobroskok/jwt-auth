import { NavLink } from "react-router-dom";
import { AppRoutes } from "shared/lib";
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
          to={AppRoutes.ROOT}
        >
          Home
        </NavLink>
        {isAuthorize ? (
          <NavLink
            className={({ isActive }) => navLinkClassName(isActive)}
            to={AppRoutes.PROFILE}
          >
            Profile
          </NavLink>
        ) : (
          <NavLink
            className={({ isActive }) => navLinkClassName(isActive)}
            to={AppRoutes.ACCOUNT}
          >
            Account
          </NavLink>
        )}
      </nav>
    </header>
  );
};
