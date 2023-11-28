import { Link, NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";
function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/product">Product</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li>
          <NavLink to="/login" className={styles.cta}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
