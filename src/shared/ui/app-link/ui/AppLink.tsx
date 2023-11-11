import { Link, type LinkProps } from "react-router-dom";
import clsx from "clsx";

import classes from "./AppLink.module.scss";

export const AppLink = ({ className, ...props }: LinkProps) => {
  return <Link className={clsx(classes.link, className)} {...props} />;
};
