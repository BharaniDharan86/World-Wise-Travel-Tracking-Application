import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <NavLink to="city">Cities</NavLink>
        <NavLink to="country">Countries</NavLink>
      </ul>
    </div>
  );
}

export default AppNav;
